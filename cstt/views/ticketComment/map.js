function(doc) {
// Kommentare
// Typ des CouchDB Doc fuer Aktionen
	if (doc.type == 'ticket_comment') {
		if (doc.status == "") {
		  emit(doc.ticket_ID, doc);
		}
	}
};