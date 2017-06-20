%%------------------------------------------------------------
%%
%% Implementation stub file
%% 
%% Target: CosPropertyService_PropertyNamesIterator
%% Source: /private/tmp/erlang-Y5fv/otp-OTP_R16B02/lib/cosProperty/src/CosProperty.idl
%% IC vsn: 4.3.3
%% 
%% This file is automatically generated. DO NOT EDIT IT.
%%
%%------------------------------------------------------------

-module('CosPropertyService_PropertyNamesIterator').
-ic_compiled("4_3_3").


%% Interface functions
-export([reset/1, reset/2, next_one/1]).
-export([next_one/2, next_n/2, next_n/3]).
-export([destroy/1, destroy/2]).

%% Type identification function
-export([typeID/0]).

%% Used to start server
-export([oe_create/0, oe_create_link/0, oe_create/1]).
-export([oe_create_link/1, oe_create/2, oe_create_link/2]).

%% TypeCode Functions and inheritance
-export([oe_tc/1, oe_is_a/1, oe_get_interface/0]).

%% gen server export stuff
-behaviour(gen_server).
-export([init/1, terminate/2, handle_call/3]).
-export([handle_cast/2, handle_info/2, code_change/3]).

-include_lib("orber/include/corba.hrl").


%%------------------------------------------------------------
%%
%% Object interface functions.
%%
%%------------------------------------------------------------



%%%% Operation: reset
%% 
%%   Returns: RetVal
%%
reset(OE_THIS) ->
    corba:call(OE_THIS, reset, [], ?MODULE).

reset(OE_THIS, OE_Options) ->
    corba:call(OE_THIS, reset, [], ?MODULE, OE_Options).

%%%% Operation: next_one
%% 
%%   Returns: RetVal, Property_name
%%
next_one(OE_THIS) ->
    corba:call(OE_THIS, next_one, [], ?MODULE).

next_one(OE_THIS, OE_Options) ->
    corba:call(OE_THIS, next_one, [], ?MODULE, OE_Options).

%%%% Operation: next_n
%% 
%%   Returns: RetVal, Property_names
%%
next_n(OE_THIS, How_many) ->
    corba:call(OE_THIS, next_n, [How_many], ?MODULE).

next_n(OE_THIS, OE_Options, How_many) ->
    corba:call(OE_THIS, next_n, [How_many], ?MODULE, OE_Options).

%%%% Operation: destroy
%% 
%%   Returns: RetVal
%%
destroy(OE_THIS) ->
    corba:call(OE_THIS, destroy, [], ?MODULE).

destroy(OE_THIS, OE_Options) ->
    corba:call(OE_THIS, destroy, [], ?MODULE, OE_Options).

%%------------------------------------------------------------
%%
%% Inherited Interfaces
%%
%%------------------------------------------------------------
oe_is_a("IDL:omg.org/CosPropertyService/PropertyNamesIterator:1.0") -> true;
oe_is_a(_) -> false.

%%------------------------------------------------------------
%%
%% Interface TypeCode
%%
%%------------------------------------------------------------
oe_tc(reset) -> 
	{tk_void,[],[]};
oe_tc(next_one) -> 
	{tk_boolean,[],[{tk_string,0}]};
oe_tc(next_n) -> 
	{tk_boolean,[tk_ulong],[{tk_sequence,{tk_string,0},0}]};
oe_tc(destroy) -> 
	{tk_void,[],[]};
oe_tc(_) -> undefined.

oe_get_interface() -> 
	[{"destroy", oe_tc(destroy)},
	{"next_n", oe_tc(next_n)},
	{"next_one", oe_tc(next_one)},
	{"reset", oe_tc(reset)}].




%%------------------------------------------------------------
%%
%% Object server implementation.
%%
%%------------------------------------------------------------


%%------------------------------------------------------------
%%
%% Function for fetching the interface type ID.
%%
%%------------------------------------------------------------

typeID() ->
    "IDL:omg.org/CosPropertyService/PropertyNamesIterator:1.0".


%%------------------------------------------------------------
%%
%% Object creation functions.
%%
%%------------------------------------------------------------

oe_create() ->
    corba:create(?MODULE, "IDL:omg.org/CosPropertyService/PropertyNamesIterator:1.0").

oe_create_link() ->
    corba:create_link(?MODULE, "IDL:omg.org/CosPropertyService/PropertyNamesIterator:1.0").

oe_create(Env) ->
    corba:create(?MODULE, "IDL:omg.org/CosPropertyService/PropertyNamesIterator:1.0", Env).

oe_create_link(Env) ->
    corba:create_link(?MODULE, "IDL:omg.org/CosPropertyService/PropertyNamesIterator:1.0", Env).

oe_create(Env, RegName) ->
    corba:create(?MODULE, "IDL:omg.org/CosPropertyService/PropertyNamesIterator:1.0", Env, RegName).

oe_create_link(Env, RegName) ->
    corba:create_link(?MODULE, "IDL:omg.org/CosPropertyService/PropertyNamesIterator:1.0", Env, RegName).

%%------------------------------------------------------------
%%
%% Init & terminate functions.
%%
%%------------------------------------------------------------

init(Env) ->
%% Call to implementation init
    corba:handle_init('CosPropertyService_PropertyNamesIterator_impl', Env).

terminate(Reason, State) ->
    corba:handle_terminate('CosPropertyService_PropertyNamesIterator_impl', Reason, State).


%%%% Operation: reset
%% 
%%   Returns: RetVal
%%
handle_call({_, OE_Context, reset, []}, _, OE_State) ->
  corba:handle_call('CosPropertyService_PropertyNamesIterator_impl', reset, [], OE_State, OE_Context, false, false);

%%%% Operation: next_one
%% 
%%   Returns: RetVal, Property_name
%%
handle_call({_, OE_Context, next_one, []}, _, OE_State) ->
  corba:handle_call('CosPropertyService_PropertyNamesIterator_impl', next_one, [], OE_State, OE_Context, false, false);

%%%% Operation: next_n
%% 
%%   Returns: RetVal, Property_names
%%
handle_call({_, OE_Context, next_n, [How_many]}, _, OE_State) ->
  corba:handle_call('CosPropertyService_PropertyNamesIterator_impl', next_n, [How_many], OE_State, OE_Context, false, false);

%%%% Operation: destroy
%% 
%%   Returns: RetVal
%%
handle_call({_, OE_Context, destroy, []}, _, OE_State) ->
  corba:handle_call('CosPropertyService_PropertyNamesIterator_impl', destroy, [], OE_State, OE_Context, false, false);



%%%% Standard gen_server call handle
%%
handle_call(stop, _, State) ->
    {stop, normal, ok, State};

handle_call(_, _, State) ->
    {reply, catch corba:raise(#'BAD_OPERATION'{minor=1163001857, completion_status='COMPLETED_NO'}), State}.


%%%% Standard gen_server cast handle
%%
handle_cast(stop, State) ->
    {stop, normal, State};

handle_cast(_, State) ->
    {noreply, State}.


%%%% Standard gen_server handles
%%
handle_info(_, State) ->
    {noreply, State}.


code_change(OldVsn, State, Extra) ->
    corba:handle_code_change('CosPropertyService_PropertyNamesIterator_impl', OldVsn, State, Extra).

