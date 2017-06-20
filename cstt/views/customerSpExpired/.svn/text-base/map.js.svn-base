function(doc) {
	if (doc.type == 'customer') {
		if (!doc.supportTo == '') {	
	 		 emit(doc.supportTo, {company: doc.company, supportTo: doc.supportTo});
		}
	}
};