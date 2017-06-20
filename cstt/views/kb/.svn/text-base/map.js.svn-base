function(doc) {
if (doc.type == 'ticket' && typeof(doc.qualifiedSolution) !== "undefined") {
	
	var kbArticleID = '#'+doc.ticketNumber;
	
	emit(kbArticleID, {kbid: kbArticleID, ticket_doc: doc._id, title: doc.title, solution: doc.qualifiedSolution });

}

};