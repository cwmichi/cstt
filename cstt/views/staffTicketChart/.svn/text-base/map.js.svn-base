function(doc) {
// Alle Tickets
    if (doc.type == 'ticket') {
    	var date = new Date(doc.ticketNumber*1000);
		var year = date.getFullYear();
		 emit(["Alle Jahre", doc.owner], 1);
         emit([year, doc.owner], 1);
    }
};