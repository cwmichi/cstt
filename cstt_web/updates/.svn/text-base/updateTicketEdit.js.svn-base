// Update: Ticket editieren
function(doc,req) {
   
// action
var action = req.query.action;
   
    switch (action) {
        // Ticket editieren
        case 'editTicket':
            doc.title = req.form.title;
            doc.ticket_type = req.form.ticket_type;  
            doc.product = req.form.product;  
            doc.contact_request = req.form.contact_request;
        break;       
        // Beschreibung editieren
        case 'editDescription':
            doc.description = req.form.description;
        break;
        // Loesungsvorschlag an Kunde editieren
        case 'editSolution':
            doc.solution = req.form.solution;
        break;
    }
 var message = "Edit ticket successfull!";
 return [doc, message];
}