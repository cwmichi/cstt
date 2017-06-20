function(doc) {
// Ticket Projektstatus
    if (doc.type == 'ticket' && doc.ticket_type == "Projektstatus") {
        emit(doc.date, doc);
    }
 
};