function(doc) {
	if(doc.type == 'customer') {
		emit(doc._id, {accountname: doc.company, supportTo: doc.supportTo, accountid: doc.accountid, numberOfLicences: doc.numberOfLicences});
	}
};