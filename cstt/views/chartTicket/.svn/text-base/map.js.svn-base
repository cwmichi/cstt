function(doc) {
// Alle Tickets
    if (doc.type == 'ticket') {
    	var date = new Date(doc.ticketNumber*1000);
		var year = date.getFullYear();

		 emit(["Alle Jahre", doc.ticket_type, (doc.product || "")], 1);
         emit([year, doc.ticket_type, (doc.product || "")], 1);
    }  
};