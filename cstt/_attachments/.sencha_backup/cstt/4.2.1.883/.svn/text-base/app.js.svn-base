Ext.Loader.setConfig({
    enabled: true
});

// Alle Klassen einbinden
Ext.require('*');

Ext.application({ 
    name: 'cstt',
    appFolder: 'app',
    controllers: [
        'customer',
        'tickets',
        'csttController'
    ],
    autoCreateViewport: true,
    launch: function() {
    	Ext.QuickTips.init();
    	
    	Ext.Ajax.timeout = 5*60*1000; //5 minutes

    	
    	
    	
    	Ext.apply(Ext.form.field.VTypes, {
	uniqueNameText: 'Der angegebene Wert ist bereits vorhanden. Bitte w&auml;hlen Sie einen anderen Wert/Text.',
    //  vtype validation function
    uniqueName: function(val, field) {

    if(!Ext.isEmpty(field.uniqueURL)) {
    	
    	if(typeof field.originalValue != 'undefined' && field.isEqual(Ext.util.Format.lowercase(val), Ext.util.Format.lowercase(field.originalValue))) {
    		return true;	
    	}
    	
		var trimValue = Ext.util.Format.trim(val);			
      
		var lowercase = Ext.util.Format.lowercase(trimValue);
		var uppercase = Ext.util.Format.uppercase(trimValue);
      
		// TODO: Hier mŸssen noch AnfŸhrungszeichen mit einem Backslash durchgefŸhrt werden!
      
 			Ext.Ajax.request({
                method: 'GET',
                async: false,
                url: field.uniqueURL + '?startkey="'+encodeURIComponent(lowercase)+'"&endkey="'+encodeURIComponent(uppercase)+'"',
                // Header auf application/json setzen - CouchDB
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                callback : function(opts, success, response) {
				var json = Ext.JSON.decode(response.responseText);

		                 if (!Ext.isEmpty(json.rows) && json.rows.length > 0) {
							result = false;

		                 } else {
		                 	result = true;
		                 }
                	
   				 }
            });
            
    	}    

     return result;
    }
});
    }
});