-module (cstt_files).
-compile(export_all).
-include_lib("nitrogen_core/include/wf.hrl").

main() -> 
 	RequestBridge = wf_context:request_bridge(),
    Path = RequestBridge:path(),
    
    StripPath = string:strip(mochiweb_util:unquote(Path), both, $/),
    
    Tokens = string:tokens(StripPath, "/"),
    
    {DocID, Filename} = case Tokens of
    
	    [] -> 
	    	{<<"_design/cstt">>, <<"index.html">>};
	    [Files]  -> 
	    
	    	IsStatic = (filename:extension(Files) /= []),
	    	
	    	erlang:display(IsStatic),
	    	
			    case IsStatic of
			        true ->
			            % Serve this up as a static file.
			            {<<"_design/cstt">>, Files};
			
			        false ->
			            % CouchDB Dokument wird gelesen
			          	case wf:user() /= undefined of 
		        		true  -> display_doc(Files);
		        		false -> 
		        	
		   			 	display_doc(Files)
		    		end
		    	end;
	
	    ["js"|_] -> 
	    	{<<"_design/cstt">>, string:join(Tokens, "/")};
	    ["images"|_] -> 
	    	{<<"_design/cstt">>, string:join(Tokens, "/")};	
	    ["css"|_] -> 
	    	{<<"_design/cstt">>, string:join(Tokens, "/")};
	    ["json"|_] -> 
	    	{<<"_design/cstt">>, string:join(Tokens, "/")};
	    ["resources"|_] -> 
	    	{<<"_design/cstt">>, string:join(Tokens, "/")};
	    [Rest|Name] -> 
	    
		    case wf:user() /= undefined of 
	        	true  -> ok;
	        	false -> 
	        	
	   			 main_not_auth()
	    	end,
	    
	    	
	    
	    	{Rest, Name}
    end,
    
    
	{ok, Attachment, ContentType} = cstt_couch:open_attachment(<<"cstt">>, DocID, Filename),
	
	wf:content_type(ContentType),
	
	Attachment.

	
main_not_auth() ->
	Response = wf_context:response_bridge(),    
    Response1 = Response:status_code(401),
    Response2 = Response1:header("Content-Type", "text/plain; charset=utf-8"),
    Response3 = Response2:data("{\"error\": \"not authenticated\"}"),
    Response3:build_response().
    
    
    display_doc(DocID) ->
    	{ok, Db} = cstt_couch:open_db(<<"cstt">>),
    	{ok, Doc} = cstt_couch:open_doc(Db, DocID),
    	
    		Response = wf_context:response_bridge(),    
		    Response1 = Response:status_code(200),
		    Response2 = Response1:header("Content-Type", "text/plain; charset=utf-8"),
		    Response3 = Response2:data([  mochijson2:encode(Doc) ]),
		    Response3:build_response().