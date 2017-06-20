function(doc) {
// Ticket Historie
    if (doc.type == 'ticket' && doc.status == '0' && doc.product == 'asm') {
         emit(doc.ticketNumber, doc);
    }  
};