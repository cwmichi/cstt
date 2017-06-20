function(doc) {
// Aktuelle Tickets & Projektstatus - letzten 24 Stunden
// darf nicht geschlossen oder zurueckgestellt sein!
if (doc.type == 'ticket' && doc.status !== '0' && doc.status !== '8') {
	
if (doc.ticket_type == "Projektstatus") {

// Aktuelles Datum als Timestamp
var currentDate = Math.round((new Date().getTime())/1000);

// Ticket Datum als Timestamp
var ticketDate = parseInt(doc.ticketNumber);

// 1 Tage in Uebersicht lassen
var days = 1*60*60*24;

// Differenz berechnen
var calcTime = currentDate - ticketDate;

	// Wenn Projekstatus noch keine 1 Tage alt ist, dann zeige das Ticket an	
	if (calcTime <= days) {
  		emit(doc.ticketNumber, doc);
	}


} else {
	emit(doc.ticketNumber, doc);
}



}

};