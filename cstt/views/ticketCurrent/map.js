function(doc) {
// Aktuelle Tickets
// darf nicht geschlossen oder zurueckgestellt sein!
if (doc.type == 'ticket' && doc.status !== '0' && doc.status !== '8') {

if (doc.ticket_type == "Projektstatus") {

// Aktuelles Datum als Timestamp
var currentDate = Date.parse(new Date())/1000;

// Ticket Datum als Timestamp
var ticketDate = parseInt(doc.ticketNumber);

// 3 Tage in Uebersicht lassen
var days = 3*60*60*24;

// Differenz berechnen
var calcTime = currentDate - ticketDate;

	// Wenn Projekstatus noch keine 3 Tage alt ist, dann zeige das Ticket an	
	if (calcTime <= days) {
  		emit(doc._id, doc);
	}


} else {
	emit(doc._id, doc);
}



}

};