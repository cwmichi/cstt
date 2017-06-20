Ext.define('cstt.view.deleteFileForm', {
    extend: 'cstt.view.ui.deleteFileForm',
    alias: 'widget.deleteFileForm',

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },
    
    saveFormToCouchDB: function() {
    	 Ext.Ajax.request({
                method: 'POST',
                url: '../../',
                // Header auf application/json setzen - CouchDB
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                // Die Formular-Eingaben uebergeben
                params: Ext.JSON.encode(this.down('form').getForm().getValues()),
                scope: this,
                 success: function (result, request ) {				
                    // Get JSON 
                    var json = Ext.JSON.decode(result.responseText);                   
                    
                    // Fenster schliessen
                    this.close();
                    
                    // Store f¸r Dateianh‰nge aktualisieren
					Ext.getCmp(this.ExtJSattachmentGridID).onRefreshClick();

                    // Wait Message verbergen			
                    Ext.MessageBox.hide();

                },
                failure: function(){
                    // Wait Message verbergen			
                    Ext.MessageBox.hide();

                    // Zeige Fehler während des Speicherns			
                    boxErrorDuringSaving();			  
                }
            });
    },

    onCancelClick: function(button, e, options) {
        this.close();
    },

    onSaveClick: function(button, e, options) {
        // Formularüberprüfung
        if (this.down('form').getForm().isValid()) {

            // Wait Message anzeigen	
            Ext.MessageBox.wait('Speichern ...', 'Bitte warten ...');

          
            this.down('#time_deleted').setValue(new Date());
            this.down('#staff_ID').setValue(sessionUserID);

       
            
            
            
            
            
           
            
            Ext.Ajax.request({
                method: 'GET',
                url: '../../'+this.down('#ticketDocID').getValue(),
                // Header auf application/json setzen - CouchDB
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                scope: this,
                success: function (result, request) {				
                    // Get JSON 
                    var json = Ext.JSON.decode(result.responseText);	

                    Ext.Ajax.request({
                        method: 'DELETE',
                        url: '../../'+this.down('#ticketDocID').getValue() + '/'+ this.down('#filename').getValue()+'?rev=' + json._rev,
                        scope: this,
                        success: function (result, request) {
                         	var json = Ext.JSON.decode(result.responseText);
                         	this.down('#ticketRevision').setValue(json.rev);
                         	this.saveFormToCouchDB();
                         },
                         failure: function (result, request) {
                         	 // Wait Message verbergen			
                    		Ext.MessageBox.hide();
                    
                          	 Ext.MessageBox.show({
			                    title: 'L&ouml;schen nicht m&ouml;glich',
			                    msg: 'Die Datei konnte aufgrund eines Fehlers nicht gel&ouml;scht werden. Bitte versuchen Sie es erneut!',
			                    buttons: Ext.MessageBox.OK,
			                    icon: Ext.MessageBox.ERROR
			                });	
                         }
                    });	

                },
                failure: function() {
		             // Wait Message verbergen			
		            Ext.MessageBox.hide();
		             // Zeige Fehler während des Speicherns			
		            boxErrorDuringSaving();			
                }
            });	
            
            
            
            
            
            
            
            
            
            
            
            
            
        }
        else {		
            // Zeige Warnung - nicht alle Felder ausgefüllt
            boxWarningRequiredFields();	
        }
    }

});