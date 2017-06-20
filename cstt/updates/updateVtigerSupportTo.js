// Update: Vtiger Support bis fuer Kunde
function(doc,req) {
	 doc.supportTo = req.form.support_to;
	 
	 var message = "Edit support successfull!";
	 return [doc, message];
}