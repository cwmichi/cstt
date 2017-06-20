-module (index).
-compile(export_all).
-include_lib("nitrogen_core/include/wf.hrl").

% wird nicht mehr benötigt.
main() -> 
 	RequestBridge = wf_context:request_bridge(),
    Path = RequestBridge:path(),
    
    StripPath = string:strip(Path, both, $/),
    
    Filename = case Path of
    	"/" -> <<"index.html">>;
    	_ -> StripPath
    end,
    
    Tokens = string:tokens(Path1, "/"),
    
   
	{ok, Attachment, ContentType} = cstt_couch:open_attachment(<<"cstt">>, <<"_design/cstt">>, Filename),
	
	wf:content_type(ContentType),
	
	Attachment.