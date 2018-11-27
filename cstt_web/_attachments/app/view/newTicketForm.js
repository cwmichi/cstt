/*
 * File: app/view/newTicketForm.js
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

Ext.define('cstt.view.newTicketForm', {
    extend: 'cstt.view.ui.newTicketForm',
    alias: 'widget.newTicketForm',

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },

    onSaveClick: function(button, e, options) {
    	
    	//console.log(Ext.data.StoreManager.lookup('companyComboBoxStore'));
        // Formularüberprüfung
        if (this.getForm().isValid()) {

            var now = new Date();
            var parseTicketNumber = Date.parse(now)/1000;
            this.down('#ticketNumber').setValue(parseTicketNumber);	
            this.down('#lastEditorID').setValue(sessionUserID);
            this.down('#owner').setValue(sessionUserID);
            	
            // Stats auf offen setzen
            this.down('#status').setValue('1');

            Ext.Ajax.request({
                method: 'POST',
                url: '../../',
                // Header auf application/json setzen - CouchDB
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                // Die Formular-Eingaben uebergeben
                params: Ext.JSON.encode(this.getForm().getValues()),
                scope: this,
                success: function (result, request) {				
                    // Get JSON 
                    var json = Ext.JSON.decode(result.responseText);	

                    this.down('#tabPanelNewTicketForm').show();				
                    this.down('#buttonSave').hide();
                    this.down('#buttonUpdate').show();
                    this.down('#tabPanelNewTicketForm').doLayout();
                    this.couchDBDocID = json.id;
                    this.down('#attachmentGridNewTicket').couchDBDocID = json.id;

                    this.doLayout();	



                },
                failure: function(){
                    // Zeige Fehler während des Speicherns			
                    boxErrorDuringSaving();			  
                }
            });

        }
        else {		
            // Zeige Warnung - nicht alle Felder ausgefüllt
            boxWarningRequiredFields();	
        }
    },

    onUpdateClick: function(button, e, options) {
    	
    //	console.log(Ext.data.StoreManager.lookup('companyComboBoxStore'));
        // Formularüberprüfung
        if (this.getForm().isValid()) {

            // Wait Message anzeigen	
            Ext.MessageBox.wait('Speichern ...', 'Bitte warten ...');

            Ext.Ajax.request({
                method: 'POST',
                scope: this,
                url: '../../_design/cstt/_update/updateNewTicket/' + this.couchDBDocID,
                // Die Formular-Eingaben uebergeben
                params: this.getForm().getValues(),
                success: function(){

                    Ext.data.StoreManager.lookup('ticketCurrentStore').load();
                    Ext.data.StoreManager.lookup('ticket24HoursStore').load();

                    // Wait Message verbergen			
                    Ext.MessageBox.hide();

                    var TabPanel = Ext.getCmp('viewport').getComponent('centerTabPanel');
                    TabPanel.remove(TabPanel.getComponent('newTicketFormTab'));


                },
                failure: function(){
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
    },

    onCancelClick: function(button, e, options) {
        if(!Ext.isEmpty(this.couchDBDocID)) {


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

                    Ext.Ajax.request({
                        method: 'DELETE',
                        url: '../../'+this.couchDBDocID + '?rev=' + json._rev
                    });	

                }
            });	

        }


        var TabPanel = Ext.getCmp('viewport').getComponent('centerTabPanel');
        TabPanel.remove(TabPanel.getComponent('newTicketFormTab'));
    },
    
    onCompanyComboBoxChange: function(field, newValue, oldValue, options) {
    
    },

    onCompanyComboBoxSelect: function(field, records, options) {
    	
    	// Diese Funktion wird auch noch im resellerWindow aufgerufen
    	// unbedingt beachten!
    	var reseller = false;
    	if(!Ext.isEmpty(records)) {
    		if(records[0].data.reseller) {
    		    reseller = records[0].data.reseller
    		}
    	} 
    	
    	if(reseller === true) {
    	
    		var resellerWin = Ext.widget('resellerWindow');
    		resellerWin.extjsCompanyBoxID = field.getId();
    		
    		var cp1v = resellerWin.down('#displayfieldCustomer').value;
    		cp1v = cp1v.replace("{COMPANY}", records[0].get('company'));
    		resellerWin.down('#displayfieldCustomer').setValue(cp1v);
    		
    		var cp2 = resellerWin.down('companyComboBox');
    		cp2.getStore().load({
    			params: {
    				'key': '"'+field.getValue()+'"'
    			}
    		});
    		
    		resellerWin.show();
    	}
    	
        // Kontaktperson-Auswahl beim Wechsel eines Kunden zurücksetzen
        this.down('#contactPersonComboBox').reset();

        Ext.data.StoreManager.lookup('contactToCompanyStore').load({
            params: {
                "key": '"'+field.getValue()+'"'
            }
        });	

        Ext.Ajax.request({
            method: 'GET',
            url: '../../'+field.getValue(),
            // Header auf application/json setzen - CouchDB
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            scope: this,
            success: function (result, request ) {
                var json = Ext.JSON.decode(result.responseText);
                
                  var supportCancel;
                
                if(Ext.isEmpty(json.supportCancel) || json.supportCancel === false) {
               	 	supportCancel = false;
               	 	
                } else {
                	supportCancel = json.supportCancel;
                	
                }
                
               
                if(json.supportTo !== '') {

                // Support berechnen
                var currentDate = new Date();
                var currentDateInteger = Ext.Date.format(currentDate, 'U');

                var supportDate = Ext.Date.parse(json.supportTo+' 23:59:59','Y-m-d H:i:s');
                var supportUntilDateInteger = Ext.Date.format(supportDate, 'U');
                var supportDateDMY = Ext.Date.format(supportDate, 'd.m.Y');
                
             
                if(supportCancel === true && (supportUntilDateInteger <= currentDateInteger)) {
                
                	
                } else {
                	supportCancel = false;
                
                }
                
               if(supportCancel === true) {
               		this.down('#buttonSave').disable();

	                
	                	 Ext.MessageBox.show({
		                        title: 'Support gek&uuml;ndigt',
		                        msg: 'Der Support-Vertrag wurde vom Kunden gek&uuml;ndigt, das Support-Ticket kann daher nicht erstellt werden. Bitte an den Vertrieb weiterleiten!',
		                        buttons: Ext.MessageBox.OK,
		                        icon: Ext.MessageBox.ERROR
		                    });		
               
               } else {
               
              		 this.down('#buttonSave').enable();
    
		                // Wenn das Support bis Datum kleiner gleich das aktuelle ist, dann ist der Support abgelaufen.	
		                if (supportUntilDateInteger <= currentDateInteger && reseller === false) {				
		                    Ext.MessageBox.show({
		                        title: 'Support-Laufzeit',
		                        msg: 'Die Support-Laufzeit vom Kunden ist abgelaufen!',
		                        buttons: Ext.MessageBox.OK,
		                        icon: Ext.MessageBox.ERROR
		                    });		
               		}
               }
                
               
					
	               /* if(supportCancel === false) {
	                	
	                	this.down('#buttonSave').enable();
		                // Wenn das Support bis Datum kleiner gleich das aktuelle ist, dann ist der Support abgelaufen.	
		                if (supportUntilDateInteger <= currentDateInteger) {				
		                    Ext.MessageBox.show({
		                        title: 'Support-Laufzeit',
		                        msg: 'Die Support-Laufzeit vom Kunden ist abgelaufen!',
		                        buttons: Ext.MessageBox.OK,
		                        icon: Ext.MessageBox.ERROR
		                    });								
		                }
		                
	                } else {
	                	
	                	if (supportUntilDateInteger <= currentDateInteger) {	
	                		this.down('#buttonSave').enable();
	                	} 
	                	else {
	                	this.down('#buttonSave').disable();
	                
	                	 Ext.MessageBox.show({
		                        title: 'Support gek&uuml;ndigt',
		                        msg: 'Der Support-Vertrag wurde vom Kunden gek&uuml;ndigt, das Support-Ticket kann daher nicht erstellt werden. Bitte an den Vertrieb weiterleiten!',
		                        buttons: Ext.MessageBox.OK,
		                        icon: Ext.MessageBox.ERROR
		                    });			
	                	}

	                }
                
                
                


*/
               
         
               
                } else {
		               if(supportCancel === true) {
		               		this.down('#buttonSave').disable();
			                
			                	 Ext.MessageBox.show({
				                        title: 'Support gek&uuml;ndigt',
				                        msg: 'Der Support-Vertrag wurde vom Kunden gek&uuml;ndigt, das Support-Ticket kann daher nicht erstellt werden. Bitte an den Vertrieb weiterleiten!',
				                        buttons: Ext.MessageBox.OK,
				                        icon: Ext.MessageBox.ERROR
				                    });		
		               
		               }
                }
               
                // Informationen zum Kunden setzen 
                // Edition setzen

                 // AV-Vertrag setzen
                if(json.dcpc === true) {
                    this.down('#ticketValueDcpc').setValue("JA");
                } else {
                    this.down('#ticketValueDcpc').setValue("NEIN");
                }
                if(json.editionProduct !== '') {
                    this.down('#ticketValueEditionProduct').setValue(json.editionProduct);
                } else { this.down('#ticketValueEditionProduct').setValue('');}
                // AddOns setzen
                if(json.editionProduct !== '') {
                    this.down('#ticketValueAddOnsProduct').setValue(json.addOnsProduct);
                 } else { this.down('#ticketValueAddOnsProduct').setValue('');}
                // Lizenzen setzen
                if(json.editionProduct !== '') {
                    this.down('#ticketValueCustomerLicences').setValue(json.numberOfLicences);
                 } else { this.down('#ticketValueCustomerLicences').setValue('');}
                // Support bis Datum setzen - ansonsten Pilotkunde
                if(json.editionProduct !== '') {
                    this.down('#ticketValueSupportUntilDate').setValue(supportDateDMY);
                 } else { this.down('#ticketValueSupportUntilDate').setValue('');}
                // Besonderheiten setzen
                if(json.editionProduct !== '') {
                    this.down('#ticketValueSpecials').setValue(Ext.String.ellipsis(json.specials, 60, false));
               	Ext.QuickTips.register({
			        target: this.down('#ticketValueSpecials').getEl(),
			        title: '',
			        text: '<span style="">'+json.specials+'</span>',
			        enabled: true,
			        trackMouse: true
			    });
    
                    
                 } else {
                 	this.down('#ticketValueSpecials').setValue('');
                 	Ext.QuickTips.unregister(this.down('#ticketValueSpecials').getEl());
                 
                 }
                // Ende setzen der Informationen zum Kunden
            }
        });
    },

    onContactPersonComboBoxRender: function(abstractcomponent, options) {
        abstractcomponent.store = new Ext.data.Store({
            storeId: 'contactToCompanyStore',
            model: 'cstt.model.contactGridModel',
            sorters: [{
                property : 'contactNameConvert',
                direction: 'ASC'
            }]			
        });
    },

    onVersionOverviewButtonClick: function(button, e, options) {
        if (this.down('#companyComboBox').getValue() !== null) {

            var customerDocID = this.down('#companyComboBox').getValue();
            var customerName = this.down('#companyComboBox').getRawValue();					

            Ext.getCmp('viewport').showHistoryVersionToCustomer(customerDocID, customerName);

        } else {

            Ext.MessageBox.show({
                title: 'Hinweis',
                msg: 'Bitte wählen Sie zuerst einen Kunden aus!',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        }
    },
    
    onAttachmentsActivate: function(abstractcomponent, options) {
       abstractcomponent.down('#attachmentGridNewTicket').onRefreshClick();

    }

});