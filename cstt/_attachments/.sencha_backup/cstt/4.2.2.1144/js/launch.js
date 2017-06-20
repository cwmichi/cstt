Ext.tip.QuickTipManager.init();

// Default Timeout auf 5 min setzen
Ext.Ajax.timeout = 5*60*1000; //5 minutes

          // Add the additional 'advanced' VTypes
    Ext.apply(Ext.form.field.VTypes, {
                password: function(val, field) {
            if (field.initialPassField) {
                var pwd = field.up('form').down('#' + field.initialPassField);
                return (val == pwd.getValue());
            }
            return true;
        },

        passwordText: 'Passwort stimmen nicht &uuml;berein!'
    }); 
    
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
      
		// TODO: Hier müssen noch Anführungszeichen durch Bachslashes gesetzt werden
      
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
        // Override for adding tooltips to form fields
Ext.override(Ext.form.Field, {
    afterRender : function() 
    {         
        this.callParent(arguments);   
        try {
            if(this.biTooltipText)
            {
                create_tooltip_fields(this, this.biTooltipText);
            }
        } catch(e){}
    }
});

function create_tooltip_fields(field, tooltipText)
{
    Ext.QuickTips.register({
        target:  field.getEl(),
        title: '',
        text: '<span style="">' + tooltipText +'</span>',
        enabled: true,
        trackMouse: true
    });
    var label = findLabel(field);
    if(label)
    {
        Ext.QuickTips.register({
            target:  label,
            title: '',
            text: '<span style="">' + tooltipText +'</span>',
            enabled: true,
            trackMouse: true
        });
    }
}

var findLabel = function(field) {
    
    var wrapDiv = null;
    var label = null

    // find form-element and label
    wrapDiv = field.getEl().up('div.x-form-element');
    if(wrapDiv)
        label = wrapDiv.child('label');
    
    if(label)
        return label;
    
    // find form-item and label
    wrapDiv = field.getEl().up('div.x-form-item');
    if(wrapDiv)
        label = wrapDiv.child('label');
    
    if(label)
        return label;
}


        
        
        
        Ext.define('Ext.form.action.SubmitCouchDB', {
    		override: 'Ext.form.action.Submit',
    		onSuccess: function(response) {

				var form = this.form,
				success = true,
				result = this.processResponse(response);
				
				// Änderungen für CouchDB Dateiuploads
				if(form.owner.couchUpload === true) {
					result = true;
					
				}
				// Ende Änderungen für CouchDB Dateiuploads
				
				if (result !== true && !result.success) {
				if (result.errors) {
				form.markInvalid(result.errors);
				}
				this.failureType = Ext.form.action.Action.SERVER_INVALID;
				success = false;
				}
				
				form.afterAction(this, success);
			}

    	});
    	
