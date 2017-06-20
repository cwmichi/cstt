function(doc) {
// Zurueckgestellte Tickets
    if (doc.type == 'ticket' && doc.status == '8') {
         emit(doc.ticketNumber, doc);
    }  
};