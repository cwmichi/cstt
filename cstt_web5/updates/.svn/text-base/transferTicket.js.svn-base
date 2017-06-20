// Update: Ticket Aktionen
function(doc,req) {
   
// action
var customerDOC = req.query.customerDocID;
var contactDOC = req.query.contactDocID;
                
	doc.customerDocID = customerDOC;
	doc.contactDocID = contactDOC;
	
    var message = "Transfer: ticket transfered completed";        
    return [doc, message];      
}