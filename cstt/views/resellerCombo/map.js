function(doc) {
	// Kunden - ComboBox
    if (doc.type == 'customer') {
       	if(doc.reseller === true || doc.reseller == 'true') {
        	emit('reseller', {_id: doc._id, company: doc.company});
		}

		if(typeof doc.containsReseller != 'undefined' && doc.containsReseller !== 'none') {
			emit(doc.containsReseller, {_id: doc._id, company: doc.company});
		}
             
    }

};