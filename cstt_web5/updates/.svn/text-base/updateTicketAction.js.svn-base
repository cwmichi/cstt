// Update: Ticket Aktionen
function(doc,req) {
   
// action
var action = req.query.action;
                
    switch (action) {  
        // Ticket Schliessen
        case 'closeTicket':        
            doc.status = '0';        
            doc.lastEditorID = req.form.staff_ID;        
        break;                
         // In Bearbeitung (Support)        
        case 'progressSupport':                
            doc.status = '2';        
            doc.lastEditorID = req.form.staff_ID;
        break;
        // In Bearbeitung (Kunde)        
        case 'progressCustomer':        
            doc.status = '3';         
            doc.lastEditorID = req.form.staff_ID;         
        break;    
        // Weitergabe an Entwicklung        
        case 'progressDevelopment':        
            doc.status = '4';        
            doc.lastEditorID = req.form.staff_ID;        
        break;                
        // Loesungsvorschlag an Kunden        
        case 'progressSolution':        
            doc.status = '5';        
            doc.solution = req.form.comment        
            doc.lastEditorID = req.form.staff_ID;        
        break;                
        // Eskalation 2nd Level        
        case 'progressEscalation':        
            doc.status = '6';        
            doc.lastEditorID = req.form.staff_ID;        
        break;
        // Eskalation Vertrieb
        case 'progressEscalationSales':
            doc.status = '7';
            doc.lastEditorID = req.form.staff_ID;        
        break;    
        // Ticket zurueckstellen
        case 'progressDeferred':
            doc.status = '8';
            doc.lastEditorID = req.form.staff_ID;        
        break;   
         // Weitergabe an Entwicklung (Hauptplatz)       
        case 'progressDevelopmentOffice':        
            doc.status = '9';        
            doc.lastEditorID = req.form.staff_ID;        
        break;  
        // Qualifizierte Loesung uebernehmen        
        case 'qualifiedSolution':                
            doc.qualifiedSolution = doc.solution;       
        break;                    
        // Kommentar        
        case 'progressComment':        
        // nichts machen!!!        
        break;           
    }          
    var message = "Action: changed status";        
    return [doc, message];      
}