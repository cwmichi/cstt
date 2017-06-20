function(doc) {
// Aktionen
// Typ des CouchDB Doc fuer Aktionen
	if (doc.type == 'ticket_comment') {
		if (doc.status!=='' || doc.status == '0') {
		  emit(doc.ticket_ID, doc);
		}
	}
};