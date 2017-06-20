% vim: sw=4 ts=4 et ft=erlang
% Nitrogen Web Framework for Erlang
% Copyright (c) 2008-2010 Rusty Klophaus
% See MIT-LICENSE for licensing information.

-module (cstt_router).
-behaviour (route_handler).
-include_lib("nitrogen_core/include/wf.hrl").
-export ([
    init/2, 
    finish/2
]).


init(_Config, State) -> 
    % Get the path...
    RequestBridge = wf_context:request_bridge(),
    Path = RequestBridge:path(),
    
    Routes = [
	{"/", cstt_files},
	{"/data", cstt_data},
	{"/_view", cstt_views},
	{"/_changes", cstt_changes}

  ],
  

    % Match to the longest possible route.
    {Module, PathInfo} = route(Path, Routes),
    {Module1, PathInfo1} = check_for_404(Module, PathInfo, Path),
    wf_context:page_module(Module1),
    wf_context:path_info(PathInfo1),
    {ok, State}.

finish(_Config, State) -> 
    {ok, State}.

%%% PRIVATE FUNCTIONS %%%

% Look through all routes for a route that matches
% the specified path. If none are found, then 
% this is a static file. If more than one route are
% found, takes the longest.
route(Path, Routes) ->
    % Returns {SizeOfMatch, Prefix, Module}
    F = fun(Prefix, Module) ->
        case string:str(Path, Prefix) of
            1 -> {length(Prefix), Prefix, Module};
            _ -> not_found
        end
    end,
    Matches = [F(Prefix, Module) || {Prefix, Module} <- Routes],
    Matches1 = lists:reverse(lists:sort([X || X <- Matches, X /= not_found])),
    case Matches1 of
        [] ->
            {static_file, Path};
        [{_, _, static_file}|_] ->
            {static_file, Path};
        [{_, Prefix, Module}|_] ->
            {Module, string:substr(Path, length(Prefix) + 1)}
    end.

check_for_404(static_file, _PathInfo, Path) ->
    {static_file, Path};

check_for_404(Module, PathInfo, Path) ->
    % Make sure the requested module is loaded. If it
    % is not, then try to load the web_404 page. If that
    % is not available, then default to the 'file_not_found_page' module.
    case code:ensure_loaded(Module) of
        {module, Module} -> {Module, PathInfo};
        _ -> 
            case code:ensure_loaded(web_404) of
                {module, web_404} -> {web_404, Path};
                _ -> {file_not_found_page, Path}
            end
    end.