function(doc) {
// Alle Tickets
    if (doc.type == 'ticket') {
    	var date = new Date(doc.ticketNumber*1000);
		var year = date.getFullYear();
		 emit("Alle Jahre", 1);
         emit(year, 1);
    }  
};