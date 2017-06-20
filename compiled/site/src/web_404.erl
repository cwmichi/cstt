-module(web_404).

-compile(export_all).

-include_lib("nitrogen_core/include/wf.hrl").

main() ->
	Result = [{<<"error">>, <<"page not found">>}],	
	[  mochijson2:encode(Result) ].