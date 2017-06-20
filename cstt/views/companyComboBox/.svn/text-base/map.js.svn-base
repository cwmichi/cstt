function(doc) {
	// Kunden - ComboBox
    if (doc.type == 'customer') {
         if (doc.pilot == 'true' || doc.pilot === true) {
             emit(doc._id, {_id: doc._id, company: doc.company + ' (Pilotkunde)', reseller: false});
        } else if (doc.reseller == 'true' || doc.reseller === true) {
        	 emit(doc._id, {_id: doc._id, company: doc.company + ' (Reseller)', reseller: true});
        } 
        else{
             emit(doc._id, {_id: doc._id, company: doc.company, reseller: false});
        }
    }
};