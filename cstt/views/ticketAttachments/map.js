function(doc) {
	// Ticket als Dokument
	if (doc.type == 'ticket') {
		var regexpf = new RegExp(/^.*\.(tvs)$/i);
		// Dateianhaenge
		if (doc._attachments) {
			for (var name in doc._attachments) {
				if(!regexpf.test(name)) {
	  			emit(doc._id, {_id: doc._id, _rev: doc._rev, filename: name, filesize: doc._attachments[name].length});
				}
	  	  	}
		 }
	}
};