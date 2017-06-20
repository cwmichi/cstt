-module(cstt_views).

-compile(export_all).
-include_lib("nitrogen_core/include/wf.hrl").

main() -> 
    case wf:user() /= undefined of 
        true  -> main_authorized();
        false -> main_authorized()
    end.
    
main_not_auth() ->
	Response = wf_context:response_bridge(),    
    Response1 = Response:status_code(401),
    Response2 = Response1:header("Content-Type", "text/plain; charset=utf-8"),
    Response3 = Response2:data("{\"error\": \"not authenticated\"}"),
    Response3:build_response().   

main_authorized()  ->

	Req = wf_context:request_bridge(),
    Path = Req:path(),
    
    StripPath = string:strip(mochiweb_util:unquote(Path), both, $/),
    
    Tokens = string:tokens(StripPath, "/"),
    
    Params = wf:params(),
    
    [Head, Tail] = Tokens,

    Json = cstt_couch:query_view(<<"cstt">>, <<"cstt">>, couch_util:to_binary(Tail)),
       
	?PRINT(Json),
		
   % [  mochijson2:encode(Result) ].
   
   "[]".