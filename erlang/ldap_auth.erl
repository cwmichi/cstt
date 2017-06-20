%%%-------------------------------------------------------------------
%%% @author dmoore
%%% @copyright (C) 2013, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 13. Oct 2013 6:09 PM
%%%-------------------------------------------------------------------
-module(ldap_auth).
-author("dmoore").
-include("couch_db.hrl").



%% API
-export([handle_basic_auth_req/1, handle_admin_role/1]).
-export([handle_session_req/1]).

-import(couch_httpd, [header_value/2, send_json/2, send_json/4, send_method_not_allowed/2]).

-import(ldap_auth_config, [get_config/1]).
-import(ldap_auth_gateway, [connect/0, authenticate/3, get_user_dn/2, get_group_memberships/2]).

% many functions in here are taken from or based on things here:
% https://github.com/davisp/couchdb/blob/5d4ef93048f4aca24bef00fb5b2c13c54c2bbbb3/src/couchdb/couch_httpd_auth.erl

replace(L, K1, V1, K2, V2) ->
	ManP1 = lists:keystore(K1, 1, L, {K1, V1}),

	lists:keystore(K2, 1, ManP1, {K2, V2}).
	
	
handle_basic_auth_req(Req) ->
  case basic_name_pw(Req) of
    {UserName, Password} ->
      case authenticate_user(UserName, Password) of
        {ok, checked} ->
          Req#httpd{
            user_ctx = #user_ctx {
              name = ?l2b(UserName),
              roles = [<<"_admin">>]
            }
          };
        _ -> Req
      end;
    nil ->
      Req
  end.

handle_admin_role(Req) ->
  % This is a workaround pending a resolution to https://issues.apache.org/jira/browse/COUCHDB-2034
  [AuthenticationHandlers] = get_config(["AuthenticationHandlers"]),
  {ok, Tokens, _} = erl_scan:string("[" ++ AuthenticationHandlers ++ "]."),
  {ok, Term} = erl_parse:parse_term(Tokens),
  run_auth_handlers(Req, Term).


run_auth_handlers(Req, []) -> Req;
run_auth_handlers(Req, [ {Mod, Fun} | Rem]) -> run_auth_handlers(Mod:Fun(Req), Rem);
run_auth_handlers(Req, [ {Mod, Fun, SpecArg} | Rem]) -> run_auth_handlers(Mod:Fun(Req, SpecArg), Rem).

% session handlers
% Login handler with user db
handle_session_req(#httpd{method='POST', mochi_req=MochiReq}=Req) ->
  {UserName, Password} = get_req_credentials(Req),
  ?LOG_DEBUG("Attempt Login: ~s",[UserName]),
  User = case couch_auth_cache:get_user_creds(UserName) of
           nil -> [];
           Result -> Result
         end,
  UserSalt = couch_util:get_value(<<"salt">>, User, <<>>),
  case authenticate_user(UserName, Password) of
    {ok, checked} ->
      set_user_roles(UserName),

      % setup the session cookie
      Secret = ?l2b(ensure_cookie_auth_secret()),
      CurrentTime = make_cookie_time(),
      Cookie = cookie_auth_cookie(Req, ?b2l(UserName), <<Secret/binary, UserSalt/binary>>, CurrentTime),
      % TODO document the "next" feature in Futon
      {Code, Headers} = redirect_or_default(Req, "next", {200, [Cookie]}),
      
      
      CsttUserDoc = couch_util:get_value(<<"cstt_user_doc">>, User, <<>>),
      
      
      send_json(Req#httpd{req_body=MochiReq:recv_body()}, Code, Headers,
        {[
          {ok, true},
          {<<"userCtx">>, {[
          {name, UserName},
          {roles, [<<"_admin">>]},
          {cstt_user_doc, CsttUserDoc}
        ]}}
        ]});
    _Else ->
      % clear the session
      Cookie = mochiweb_cookies:cookie("AuthSession", "", [{path, "/"}] ++ cookie_scheme(Req)),
      {Code, Headers} = redirect_or_default(Req, "fail", {401, [Cookie]}),
      send_json(Req, Code, Headers, {[{error, <<"unauthorized">>},{reason, <<"Name or password is incorrect.">>}]})
  end;
% get user info
% GET /_session
handle_session_req(#httpd{method='GET', user_ctx=UserCtx}=Req) ->
  Name = UserCtx#user_ctx.name,
  ForceLogin = couch_httpd:qs_value(Req, "basic", "false"),
 
          
  case {Name, ForceLogin} of
    {null, "true"} ->
      throw({unauthorized, <<"Please login.">>});
    {Name, _} ->
    
			CsttUserDoc = case Name of
				null -> null;
			_ ->	User = case couch_auth_cache:get_user_creds(Name) of
           nil -> [];
           Result -> Result
         end,
         
         couch_util:get_value(<<"cstt_user_doc">>, User, <<>>)
         
         end,
         
         
 	?LOG_DEBUG("Attempt Login: ~s",[UserCtx]),
      send_json(Req, {[
        % remove this ok
        {ok, true},
        {<<"userCtx">>, {[
          {name, Name},
          {roles, UserCtx#user_ctx.roles},
          {cstt_user_doc, CsttUserDoc}
        ]}},
        {info, {get_auth_info(Req)}}
      ]})
  end;
% logout by deleting the session
handle_session_req(#httpd{method='DELETE'}=Req) ->
  Cookie = mochiweb_cookies:cookie("AuthSession", "", [{path, "/"}] ++ cookie_scheme(Req)),
  {Code, Headers} = redirect_or_default(Req, "next", {200, [Cookie]}),
  send_json(Req, Code, Headers, {[{ok, true}]});
handle_session_req(Req) ->
  send_method_not_allowed(Req, "GET,HEAD,POST,DELETE").

auth_name(String) when is_list(String) ->
  [_,_,_,_,_,Name|_] = re:split(String, "[\\W_]", [{return, list}]),
  ?l2b(Name).

redirect_or_default(Req, RedirectHeaderKey, {_DefaultCode, DefaultHeaders} = Default) ->
  case couch_httpd:qs_value(Req, RedirectHeaderKey, nil) of
    nil -> Default;
    Redirect ->
      {302, DefaultHeaders ++ {"Location", couch_httpd:absolute_uri(Req, Redirect)}}
  end.

ensure_cookie_auth_secret() ->
  case couch_config:get("couch_httpd_auth", "secret", nil) of
    nil ->
      NewSecret = ?b2l(couch_uuids:random()),
      couch_config:set("couch_httpd_auth", "secret", NewSecret),
      NewSecret;
    Secret -> Secret
  end.

make_cookie_time() ->
  {NowMS, NowS, _} = erlang:now(),
  NowMS * 1000000 + NowS.

cookie_scheme(#httpd{mochi_req=MochiReq}) ->
  [{http_only, true}] ++
  case MochiReq:get(scheme) of
    http -> [];
    https -> [{secure, true}]
  end.

cookie_auth_cookie(Req, User, Secret, TimeStamp) ->
  SessionData = User ++ ":" ++ erlang:integer_to_list(TimeStamp, 16),
  Hash = crypto:hmac(sha, Secret, SessionData),
  mochiweb_cookies:cookie("AuthSession",
    couch_util:encodeBase64Url(SessionData ++ ":" ++ ?b2l(Hash)),
    [{path, "/"}] ++ cookie_scheme(Req) ++ max_age()).

max_age() ->
  case couch_config:get("couch_httpd_auth", "allow_persistent_cookies", "false") of
    "false" ->
      [];
    "true" ->
      Timeout = list_to_integer(
        couch_config:get("couch_httpd_auth", "timeout", "600")),
      [{max_age, Timeout}]
  end.

get_auth_info(#httpd{ user_ctx = #user_ctx { handler = Handler } }) ->
  [
    {authentication_db, ?l2b(couch_config:get("couch_httpd_auth", "authentication_db"))},
    {authentication_handlers, [auth_name(H) || H <- couch_httpd:make_fun_spec_strs(
      couch_config:get("httpd", "authentication_handlers"))]}
  ] ++
  case Handler of
    undefined -> [];
    Handler -> [{ authenticated, auth_name(?b2l(Handler)) }]
  end.

get_req_credentials(#httpd{method='POST', mochi_req=MochiReq}) ->
  ReqBody = MochiReq:recv_body(),
  Form = case MochiReq:get_primary_header_value("content-type") of
           % content type should be json
           "application/x-www-form-urlencoded" ++ _ ->
             mochiweb_util:parse_qs(ReqBody);
           "application/json" ++ _ ->
             {Pairs} = ?JSON_DECODE(ReqBody),
             [{?b2l(Key), ?b2l(Value)} || {Key, Value} <- Pairs];
           _ ->
             []
         end,
  UserName = ?l2b(couch_util:get_value("name", Form, "")),
  Password = ?l2b(couch_util:get_value("password", Form, "")),
  {UserName, Password}.

%% Michi Juli 2014  
get_cstt_user_doc(UserName) ->
	DbOptions = [{user_ctx, #user_ctx{roles = [<<"_admin">>]}}],
    {ok, Db} = couch_db:open_int(<<"cstt">>, DbOptions),
    
    {ok, DDoc} = couch_db:open_doc(Db, <<"_design/cstt">>, [ejson_body]),
    
    	ViewOptions = [
    				{include_docs, true},
					{start_key, UserName}, 
					{end_key, UserName}
        ],

	 	{ok, Res2} = couch_mrview:query_view(Db, DDoc, <<"checkLogin">>, ViewOptions),
        
        Res = proplists:delete(meta, Res2),
        ?LOG_DEBUG("cstt: Assigning user doc design doc: ~p", [Res]),
        
        case Res of
        	[] ->
        	throw({unauthorized, <<"User is not allowed to login">>});
        _ ->
        get_cstt_userdoc(Res)
        end.		

get_cstt_userdoc(Res) ->
	[{row, Value}] = Res,
        case couch_util:get_value(doc, Value, undefined) of
        	undefined ->
        		throw({unauthorized, <<"User is not allowed to login or document could not be retrieved">>});
        	DocVal ->
        	
				{TmpDoc} = DocVal,	        	
        		case couch_util:get_value(<<"disabled">>, TmpDoc, undefined) of
        			undefined -> ok;
        			true -> 
        				throw({unauthorized, <<"User is disabled for login">>})
        		end,		
        	
        	
        	
        		DocVal
end.        		

set_user_roles(UserName) ->
  DbName = ?l2b(couch_config:get("couch_httpd_auth", "authentication_db")),
  DbOptions = [{user_ctx, #user_ctx{roles = [<<"_admin">>]}}],
  {ok, AuthDb} = couch_db:open_int(DbName, DbOptions),
  
  UserDoc = get_cstt_user_doc(UserName),
  
   ?LOG_DEBUG("cstt userdoc ~p", [UserDoc]),

  DocId =  <<<<"org.couchdb.user:">>/binary, UserName/binary>>,
  Doc = case couch_db:open_doc(AuthDb, DocId, [ejson_body]) of
          {ok, OldDoc = #doc{body = {DocBody}}} ->
            OldDoc#doc{
              body = {replace(DocBody, <<"roles">>, [<<"_admin">>], <<"cstt_user_doc">>, UserDoc)}
            };
          {not_found, _} ->
            #doc{
              id = DocId,
              body = {[
                {'_id', DocId},
                {type, <<"user">>},
                {name, UserName},
                {salt, couch_uuids:random()},
                {roles, [<<"_admin">>]},
                {cstt_user_doc, UserDoc}
              ]}
            }
        end,

  % disable validation so we can put _admin in the _users db.
  case couch_db:update_doc(AuthDb#db{ validate_doc_funs=[] }, Doc, []) of
    {ok, _} -> ok;
    {error, _} = Error -> throw(Error)
  end.

authenticate_user(_UserName, _Password) when _UserName == <<"">>; _Password == <<"">> ->
  {error, missing_user_name_or_password};
authenticate_user(UserName, Password) ->
  ?LOG_DEBUG("Authenticating user: ~p", [UserName]),
  case connect() of
    {error, Reason} = Error ->
      ?LOG_ERROR("Could not connect to LDAP. Reason: ~p", [Reason]),
      Error;
    {ok, LdapConnection} ->
      case authenticate(LdapConnection, UserName, Password) of
        {error, Reason} = Error ->
          ?LOG_ERROR("Could not authenticate user ~p over LDAP. Reason: ~p", [UserName, Reason]),
          Error;
        {ok, UserDN} ->
          Groups = get_group_memberships(LdapConnection, UserDN),
          eldap:close(LdapConnection),
            ?LOG_DEBUG("Groups ~p", [Groups]),
          {ok, checked}
      end
  end.

basic_name_pw(Req) ->
  AuthorizationHeader = couch_httpd:header_value(Req, "Authorization"),
  case AuthorizationHeader of
    "Basic " ++ Base64Value ->
      case re:split(base64:decode(Base64Value), ":",
        [{return, list}, {parts, 2}]) of
        ["_", "_"] ->
          % special name and pass to be logged out
          nil;
        [User, Pass] ->
          {User, Pass};
        _ ->
          nil
      end;
    _ ->
      ?LOG_DEBUG("Could not recognize auth header ~p", [AuthorizationHeader]),
      nil
  end.
