-module(cstt_httpd_handler).

-author("Michael Scharrer <michael.scharrer@cordaware.com>").
-include("couch_db.hrl"). 

-import(couch_httpd, [send/2,send_json/2,send_json/3,send_json/4,send_method_not_allowed/2, start_json_response/2,send_chunk/2,end_json_response/1, start_chunked_response/3, send_error/4,last_chunk/1]).
-import(couch_util, [to_binary/1, to_integer/1, to_list/1, url_encode/1, get_value/2, get_value/3]).

-record(mrargs, {
    view_type,
    reduce,

    preflight_fun,

    start_key,
    start_key_docid,
    end_key,
    end_key_docid,
    keys,

    direction = fwd,
    limit = 16#10000000,
    skip = 0,
    group_level = 0,
    stale = false,
    inclusive_end = true,
    include_docs = false,
    update_seq=false,
    conflicts,
    callback,
    list,
    extra = []
}).

-export([export_tickets/2]).


status(0) ->
	<<"<font color=\"red\"><b>Geschlossen</b></font>">>;
status(1) ->
	<<"<font color=\"green\"><b>Offen</b></font>">>;
status(2) ->
	<<"<font color=\"blue\"><b>In Bearbeitung (Support)</b></font>">>;
status(3) ->
	<<"<font color=\"purple\"><b>In Bearbeitung (Kunde)</b></font>">>;	
status(4) ->
	<<"<font color=\"orange\"><b>Entwicklung (Derbystrasse)</b></font>">>;	
status(5) ->
	<<"<font color=\"brown\"><b>L&ouml;sungsvorschlag &uuml;bermittelt</b></font>">>;	
status(6) ->
	<<"<font color=\"grey\"><b>Eskalation (2nd Level)</b></font>">>;	
status(7) ->
	<<"<font color=\"#53BBFB\"><b>Eskalation (Vertrieb)</b></font>">>;	
status(8) ->
	<<"<font color=\"#013608\"><b>Zur&uuml;ckgestellt</b></font>">>;	
status(9) ->
	<<"<font color=\"#FF6600\"><b>Entwicklung (Hauptplatz)</b></font>">>;	
status(_) ->
	<<"unkown">>.

now_str() ->
  Now0 = os:timestamp(),
  Now = calendar:now_to_local_time(Now0),
  iso_8601_fmt(Now).

iso_8601_fmt(DateTime) ->
    {{Year,Month,Day},{Hour,Min,Sec}} = DateTime,
    io_lib:format("~2.10.0B.~2.10.0B.~4.10.0B ~2.10.0B:~2.10.0B:~2.10.0B",
        [Day, Month, Year, Hour, Min, Sec]).
        
        
open_doc(Db, DocID) ->
	case couch_db:open_doc(Db, DocID) of
		        {ok, Doc} ->
		           couch_doc:to_json_obj(Doc, []);
 		_ ->
	            	{DocID}
	        end.
	        
get_staff_name(Db, DocID) ->
	{JsonDoc} = open_doc(Db, DocID),
	
	get_value(<<"staff_name">>, JsonDoc).
	
get_contact_name(Db, DocID) ->
	{JsonDoc} = open_doc(Db, DocID),
	case JsonDoc of
		DocID ->
			DocID;
		_ ->	
		Salutation = get_value(<<"salutation">>, JsonDoc, <<>>),
		Forename = get_value(<<"forename">>, JsonDoc, <<>>),
		Surname = get_value(<<"surname">>, JsonDoc, <<>>),
		<<Salutation/binary, ", ",Surname/binary, " ",  Forename/binary>>
	end.	

get_customer_name(Db, DocID) ->
	{JsonDoc} = open_doc(Db, DocID),
	
	get_value(<<"company">>, JsonDoc).	

get_unix_timestamp(DateTime) ->	
calendar:datetime_to_gregorian_seconds(DateTime).	

index_of(Value, List) ->
   Map = lists:zip(List, lists:seq(1, length(List))),
   case lists:keyfind(Value, 1, Map) of
      {Value, Index} -> Index;
      false -> notfound
   end.

get_actions_string(List) ->

TTem = lists:flatten(List),

T1 = proplists:get_keys(TTem),

Keys = lists:sort(T1),

Res1 = lists:map(fun({TimSort, StaffName, DateVal, Title, Comment, StatusConvert}) ->
    				
CurrentIndex = index_of(TimSort, Keys),
    				
io_lib:format(<<"<table class=\"table-actions\" width=\"100%\">
        				<colgroup>
							<col width=\"10%\">
							<col width=\"15%\">
							<col width=\"35%\">
							<col width=\"40%\">
						</colgroup>
        				<tr><td width=\"10%\" class=\"td-border-bottom-right\"><b>Nr.: ~p</b></td><td class=\"td-border-bottom\" width=\"90%\" colspan=\"3\">~ts</td></tr>
        				<tr><td colspan=\"2\" ><b>Erstellt am:</b></td><td colspan=\"2\">~ts</td></tr>
        				<tr><td colspan=\"2\" class=\"td-border-bottom\"><b>Verfasser:</b></td><td colspan=\"2\" class=\"td-border-bottom\">~ts</td></tr>
        				<tr><td colspan=\"2\" class=\"td-border-bottom\"><b>Titel:</b></td><td colspan=\"2\" class=\"td-border-bottom\">~ts</td></tr>
        				<tr><td colspan=\"4\">~ts</td></tr>
    				</table><br/>"/utf8>>, [CurrentIndex, StatusConvert, DateVal, StaffName, Title, Comment])

end, List),



"<tr><td colspan=\"4\" class=\"td-actions-head\"><b>Aktionen</b></td></tr>
        	<!-- tr-Tag für eine Aktion! -->
        	<tr>
        		<td colspan=\"4\" class=\"td-actions\">"++Res1++"</td></tr>".
  			

get_actions(Db, DocIDTicket) ->
	% view abfragen
	% like cstt/_view/ticketActions?include_docs=true&key="2316d1ba9dfa7f630899c57e24f00efcb"
	% ?key= DocIDTicket
	
		JsonKey = DocIDTicket,
   
   		{ok, DDoc} = couch_db:open_doc(Db, <<"_design/cstt">>, [ejson_body]),

	 	{ok, Res2} = couch_mrview:query_view(Db, DDoc, <<"ticketActions">>, #mrargs{
                    include_docs = true,
					start_key=JsonKey, 
					end_key=JsonKey
        }),
        
        Res = proplists:delete(meta, Res2),
        
       Tmp = lists:map(fun(Row) ->
        	
        	{row, Val} = Row,
        	{DocVal} = couch_util:get_value(doc, Val),
        	
        	StaffID = get_value(<<"staff_ID">>, DocVal),
        	StaffName = case StaffID of
        				<<"Admin">> -> <<"Admin">>;
        				_ -> get_staff_name(Db, StaffID)
        				end,
        	CreatedOn = get_value(<<"createdOn">>, DocVal),
        	DateVal = convert_date(CreatedOn),
        	Title = get_value(<<"title">>, DocVal),
        	Comment = get_value(<<"comment">>, DocVal),
        	Status = get_value(<<"status">>, DocVal),
        	StatusConvert = case Status of
        				undefined -> <<>>;
        				<<>> -> <<>>;
        				_ -> status(to_integer(Status))
        				end,
        	
        	<<Year:4/binary, "-", Month:2/binary, "-", Day:2/binary, " ", Hour:2/binary, ":", Min:2/binary, ":", Sec:2/binary>> = CreatedOn,
        	
        	TimSort = get_unix_timestamp({{to_integer(Year),to_integer(Month),to_integer(Day)},{to_integer(Hour),to_integer(Min),to_integer(Sec)}}),
        	
     
        		
        	{TimSort, StaffName, DateVal, Title, Comment, StatusConvert}
        	
                                   

        end, Res),
        
        Sort = lists:sort(Tmp),
        
		get_actions_string(Sort).


convert_unix_stamp(ValInt) ->

	BaseDate = calendar:datetime_to_gregorian_seconds({{1970,1,1},{0,0,0}}),
	SecondsT = BaseDate + ValInt,
	DateTime = calendar:gregorian_seconds_to_datetime(SecondsT),
	
	{{Year,Month,Day},{Hour,Min,Sec}} = DateTime,
    Tmp = io_lib:format("~2.10.0B.~2.10.0B.~4.10.0B ~2.10.0B:~2.10.0B:~2.10.0B",
        [Day, Month, Year, Hour, Min, Sec]),
    TmpBin = erlang:list_to_binary(Tmp),
    <<TmpBin/binary, " (UTC 0)">>.    

convert_date(Date) ->
	<<Year:4/binary, "-", Month:2/binary, "-", Day:2/binary, " ", Hour:2/binary, ":", Min:2/binary, ":", Sec:2/binary>> = Date,
	Tmp = io_lib:format("~2.10.0B.~2.10.0B.~4.10.0B ~2.10.0B:~2.10.0B:~2.10.0B",
        [to_integer(Day), to_integer(Month), to_integer(Year), to_integer(Hour), to_integer(Min), to_integer(Sec)]),
    erlang:list_to_binary(Tmp).
	

% POST /_exportTickets
export_tickets(#httpd{method='POST',path_parts=[_,<<"_exportTickets">>]}=Req, Db) ->
	couch_httpd:validate_ctype(Req, "application/json"),
	
	% Felder und Werte aus json_body_obj holen vom POST
	{JsonValue} =  couch_httpd:json_body_obj(Req),
	
	ToMail = get_value(<<"emailTo">>, JsonValue),
	TicketArr = get_value(<<"ticketArray">>, JsonValue, []),
	Actions = get_value(<<"actions">>, JsonValue, true),
	
	CustomerVal = get_value(<<"customerDoc">>, JsonValue),
	
	CustomerDoc = case CustomerVal of
				null -> ok;
				undefined -> ok;
				_ -> CustomerVal
				end,

	
		Results = lists:map(fun(DocID) -> 
		
		
			case couch_db:open_doc(Db, DocID) of
		        {ok, Doc} ->
		           {JsonDoc} = couch_doc:to_json_obj(Doc, []),
		           
		           	ContactDocID = get_value(<<"contactDocID">>, JsonDoc),
		           	ContactName = get_contact_name(Db, ContactDocID),
	 				CustomerDocID = get_value(<<"customerDocID">>, JsonDoc),	
	 				CustomerName = get_customer_name(Db, CustomerDocID),
	 				TicketNumber = get_value(<<"ticketNumber">>, JsonDoc),
	 				TicketType = get_value(<<"ticket_type">>, JsonDoc),
	 				Title = get_value(<<"title">>, JsonDoc),
	 				Owner = get_staff_name(Db, get_value(<<"owner">>, JsonDoc)),
	 				Description = get_value(<<"description">>, JsonDoc, <<>>),
	 				Solution = get_value(<<"solution">>, JsonDoc, <<>>),
	 				ContactRequest = get_value(<<"contact_request">>, JsonDoc, <<>>),
	 				
	 				DateT = convert_unix_stamp(to_integer(TicketNumber)),

						        	 				
	 				ActionsBody = case Actions of
	 						true ->
	 							get_actions(Db, DocID);
	 						_ ->
	 							""
	        		end,
	        		
	        		        

        
	        
			        BodyP1 = io_lib:format(<<"<table class=\"table-main\" cellspacing=\"0px\">
        	<colgroup>
				<col width=\"20%\">
				<col width=\"30%\">
				<col width=\"20%\">
				<col width=\"30%\">
			</colgroup>
        	<tr><td colspan=\"4\" class=\"td-title\">~ts</td></tr>
        	<tr><td class=\"td-ticket-eigeschaften\">Datum / Zeit:</td><td>~ts</td><td class=\"td-ticket-eigeschaften\">Ticket-Nr:</td><td>~ts</td></tr>
        	<tr><td class=\"td-ticket-eigeschaften\">Firma:</td><td>~ts</td><td class=\"td-ticket-eigeschaften\">Typ:</td><td>~ts</td></tr>
        	<tr><td class=\"td-ticket-eigeschaften\">Kontaktperson:</td><td>~ts</td><td class=\"td-ticket-eigeschaften\">Ersteller:</td><td>~ts</td></tr>
        	<tr><td class=\"td-ticket-eigeschaften\">Kontaktaufnahme:</td><td>~ts</td></tr>
        	
        	<tr><td colspan=\"4\" class=\"td-header\"><p class=\"p-header\"><b>Beschreibung</b></p></td></tr>
        	<tr><td colspan=\"4\">~ts</td></tr>
        	
        	<tr><td colspan=\"4\" class=\"td-header\"><p class=\"p-header\"><b>L&ouml;sungsvorschlag</b></p></td></tr>
        	<tr><td colspan=\"4\" class=\"td-solution\">~ts</td></tr>"/utf8>>, [Title, DateT, TicketNumber, CustomerName, TicketType, ContactName, Owner, ContactRequest, Description, Solution]),
			        
			        
			        Body = BodyP1 ++ ActionsBody ++ "</table><br/><br/><br/>",
			        
			        
  				Body;
  			
  			
				% Fehler abfangen, z. B. Dokument existiert nicht mehr 
		        _ ->
	            	ok
	        end
	        

	        

		end, TicketArr),
		
		SearchKeyword = get_value(<<"search_keyword">>, JsonValue),
		
		Summe = lists:map(fun(El) -> El, 1 end, TicketArr),
		
		CountTickets = lists:sum(Summe),
		
		sendmail(ToMail, Results, SearchKeyword, CountTickets, CustomerDoc, Db), 
	

	
	send_json(Req, {[{success, true},{<<"result">>, <<"e-mail sent">>}]});

% Catch All /_exporttickets
export_tickets(Req, _Db) -> send_method_not_allowed(Req, "POST").


sendmail(ToMail, Code, SearchKeyword, CountTickets, CustomerDoc, Db) ->


Date = now_str(),



Export = case CustomerDoc of 
			ok ->
			io_lib:format(<<"<p class=\"p-email-header\">Exportdatum: ~ts</p>
        <p class=\"p-email-header\">Anzahl der Tickets: ~p</p>
        <p class=\"p-email-header\">Suchbegriff: ~ts</p><br/>"/utf8>>, [Date, CountTickets, SearchKeyword]);
        _ ->
        	CompanyName = get_customer_name(Db, CustomerDoc),
        	io_lib:format(<<"<p class=\"p-email-header\">Exportdatum: ~ts</p>
        <p class=\"p-email-header\">Anzahl der Tickets: ~p</p>
        <p class=\"p-email-header\">Kundenname: ~ts</p><br/>"/utf8>>, [Date, CountTickets, CompanyName])
       end, 
        	



	HTMLBody = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\"
\"http://www.w3.org/TR/html4/loose.dtd\">
<html xmlns=\"http://www.w3.org/1999/xhtml\">
    <head>
        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />
        <title>E-Mail Vorlage</title>
    </head>
    <style lang=\"text/CSS\">
    	body {
    		font: Verdana;
    		font-size: 17px;
    	}
    	
    	td {
    		padding: 5px 10px;
    	}
    	
    	.table-main {
    		border: 3px solid #000000;
    		/*padding: 7px;*/
    		min-width: 500px;
    	}
    	
    	.td-title {
    		font-size: 27px;
    		padding: 10px;
    	}
    	
    	.td-ticket-eigeschaften {
    		font-weight: bold;
    	}
    	
    	/*
    	 * p-Tag für Überschrift von Beschreibung und Lösungsvorschlag
    	 */
    	.p-header {
    		background: #0099FF;
    		color: #FFFFFF;
    		padding: 5px;
    	}
    	
    	.td-header {
    		padding-bottom: 0px;
    	}
    	
    	.td-solution {
    		padding-bottom: 25px;
    	}
    	
    	.td-actions-head {
    		background: #555555;
    		color: #FFFFFF;
    	}
    	
    	.td-actions {
    		padding: 10px;
    	}
    	
    	.td-border {
    		border: 1px solid black;
    	}
    	
    	.table-actions {
    		border: 1px solid #000000;
			border-spacing: 0px;
    		padding: 0px;
    		background-color: #EFEFEF;
    	}
    	
    	.td-border-bottom {
    		border-bottom: 1px solid black;
    	}
    	
    	.td-border-bottom-right {
    		border-bottom: 1px solid black;
    		border-right: 1px solid black;
    	}
    	
    	.p-email-header {
            font-size: 18px;
            font-weight: bold;
        }
    </style>
    <body>",
	
	
	
	HTMLEnd = "</body></html>",


	Body = HTMLBody ++ Export ++ Code ++ HTMLEnd,

	BodyBin = unicode:characters_to_binary(Body),
	
	Subject = <<"CSTT Ticket Export">>,
			        
			        
    Email = {<<"multipart">>, <<"alternative">>, [
                                        {<<"From">>, <<"Customer Support Ticket Tool <cstt@cordaware.com>">>},
                                        {<<"To">>, ToMail},
                                        {<<"Subject">>, Subject},
                                        {<<"MIME-Version">>, <<"1.0">>},
                                        {<<"Content-Type">>,
                                                <<"multipart/alternative; boundary=wtf-123234234">>}],
                                [{<<"content-type-params">>,
                                                [{<<"boundary">>, <<"wtf-123234234">>}]},
                                        {<<"disposition">>,<<"inline">>},
                                        {<<"disposition-params">>,[]}],
                                [{<<"text">>,<<"html">>,
                                                [{<<"Content-Type">>,<<"text/html;charset=UTF-8">>}],
                                                [{<<"content-type-params">>,
                                                                [{<<"charset">>,<<"UTF-8">>}]},
                                                        {<<"disposition">>,<<"inline">>},
                                                        {<<"disposition-params">>,[]}],
                                                BodyBin}]},
    Result = mimemail:encode(Email),
                        

    gen_smtp_client:send({"cstt@cordaware.com", [ToMail], Result}, [{relay, "sbs-2011.cordaware.local"}]).





