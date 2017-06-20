-module (attachments).
-compile(export_all).
-include_lib("nitrogen_core/include/wf.hrl").

main() -> 
 	RequestBridge = wf_context:request_bridge(),
    Path = RequestBridge:path(),
    
    Filename = case Path of
    	"/" -> <<"index.html">>;
    	_ -> erlang:list_to_binary(string:strip(Path, both, $/))
    end,
    
	{ok, Attachment, ContentType} = cstt_couch:open_attachment(<<"cstt">>, <<"_design/cstt">>, Filename),
	
	wf:content_type(ContentType),
	
	Attachment.