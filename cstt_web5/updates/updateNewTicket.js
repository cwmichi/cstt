// Update: Ticket editieren
function(doc,req) {

// Ticket speichern
// Workaround fuer Loeschen der Dateianhaenge damit diese beim Ticket speichern nicht geloescht werden
doc.contactDocID = req.form.contactDocID;
doc.customerDocID = req.form.customerDocID;
doc.description = req.form.description;
doc.lastEditorID = req.form.lastEditorID;
doc.owner = req.form.owner;
doc.status = req.form.status;
doc.ticketNumber = req.form.ticketNumber;
doc.ticket_type = req.form.ticket_type;
doc.title = req.form.title;
doc.product = req.form.product;

var message = "Update ticket successfull!";
return [doc, message];

}