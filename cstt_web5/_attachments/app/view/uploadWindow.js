/*
 * File: app/view/uploadWindow.js
 *
 * This file was generated by Sencha Designer version 2.0.0.
 * http://www.sencha.com/products/designer/
 *
 * This file requires use of the Ext JS 4.0.x library, under independent license.
 * License of Sencha Designer does not include license for Ext JS 4.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * You should implement event handling and custom methods in this
 * class.
 */

Ext.define('cstt.view.uploadWindow', {
    extend: 'cstt.view.ui.uploadWindow',
    alias: 'widget.uploadWindow',

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },

    onCancelClick: function(button, e, options) {
        this.close();

    },

    onSaveClick: function(button, e, options) {
        // console.log(this.couchDBDocID);
        // Formularüberprüfung
        var form = this.down('form').getForm();
        if (form.isValid()) {	


            Ext.Ajax.request({
                method: 'GET',
                url: '../../'+this.couchDBDocID,
                // Header auf application/json setzen - CouchDB
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                scope: this,
                success: function (result, request) {				
                    // Get JSON 
                    var json = Ext.JSON.decode(result.responseText);	

                    var couchRevID = json._rev;


                    this.down('#couchrev').setValue(couchRevID);	


					form.submit({
					 	url: '../../'+this.couchDBDocID,
						waitMsg: 'Datei wird hochgeladen...',
					 	headers: {
							'Content-Type': 'application/json; charset=utf-8'
						},
						scope: this,
						success: function(o, result) {
					           
						
						var stringRes = result.response.responseXML.activeElement.outerHTML;
						
						
						stringRes = stringRes.replace(/<(?:.|\s)*?>/g, "");
						
						//console.log(stringRes);
						var json = Ext.JSON.decode(stringRes);	
						//console.log(json);
						
						if(json.ok === true) {
						
							this.close();
							Ext.getCmp(this.ExtJSattachmentGridID).onRefreshClick();
						
						} else {
							// Zeige Fehler während des Speicherns			
							boxErrorDuringSaving();
						}
							
					
							
					    }
					});	
				    	
				    	
				    	

                    
                    


                }
            });		



        }
        else {		
            // Zeige Warnung - nicht alle Felder ausgefüllt
            boxWarningRequiredFields();	
        }
    },
    
    onWindowAfterRender: function(abstractcomponent, options) {
        if(!Ext.isEmpty(this.couch_tvs) && this.couch_tvs === true){
        	this.down('#file').vtype = 'tvs';
        }

    },
    
    onWindowDestroy: function(abstractcomponent, options) {
		// Store für Dateianhänge aktualisieren
		//Ext.getCmp(this.ExtJSattachmentGridID).onRefreshClick();
    }

});