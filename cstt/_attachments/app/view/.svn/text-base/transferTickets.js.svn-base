Ext.define('cstt.view.transferTickets', {
    extend: 'Ext.window.Window',
    alias: 'widget.transferTickets',

    height: 210,
    width: 700,
    layout: {
        type: 'fit'
    },
    
    autoShow: true,
    
    ticketArray: new Array(),
    
    customerDocID: null,
    
    title: 'Support Tickets umbuchen',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    border: false,
                    bodyPadding: 10,
                    items: [
		                 {
		                    xtype: 'displayfield',
		                    anchor: '100%',
		                    value: '<b>Achtung:</b> Bitte korrekt die Kunden & Kontaktpersonen auswählen, sonst könnten evtl. Probleme entstehen.'
		                },
		                {
                                    xtype: 'companyComboBox',
                                    itemId: 'companyComboBox',
                                    width: 420,
                                    name: 'customerDocID',
                                    labelWidth: 120,
                                    allowBlank: false,
                                    selectOnFocus: true,
                                    forceSelection: true,
                                    queryMode: 'local',
                                    typeAhead: true,
                                    labelStyle: 'font-weight:bold;',
                                    listeners: {
                                        select: {
                                            fn: me.onCompanyComboBoxSelect,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'contactPersonComboBox',
                                    width: 420,
                                    name: 'contactDocID',
                                    fieldLabel: 'Kontaktperson',
                                    labelWidth: 120,
                                    allowBlank: false,
                                    emptyText: 'Kontaktperson auswählen',
                                    selectOnFocus: true,
                                    displayField: 'contactNameConvert',
                                    queryMode: 'local',
                                    store: 'contactToCompanyStore',
                                    typeAhead: true,
                                    valueField: '_id',
                                    labelStyle: 'font-weight:bold;',
                                    listeners: {
                                        render: {
                                            fn: me.onContactPersonComboBoxRender,
                                            scope: me
                                        }
                                    }
                                }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'save',
                            text: 'Tickets jetzt transferieren',
                            listeners: {
                                click: {
                                    fn: me.onSaveClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            itemId: 'cancel',
                            text: 'Abbrechen',
                            listeners: {
                                click: {
                                    fn: me.onCancelClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onSaveClick: function(button, e, eOpts) {
    	var win = button.up('window'),
    		form = win.down('form'),
    		ticketArray = this.ticketArray;
    		
    		var customerDoc = form.down('#companyComboBox').getValue();
    		var contactDoc = form.down('#contactPersonComboBox').getValue();
			var counter = 0;
			var max = ticketArray.length;
			
			
    		if(form.getForm().isValid()) {
    			
    		Ext.example.msg('Transfer von Tickets', 'Bitte warten, der Transfer wird im Hintergrund durchgeführt.');	
    		
    		Ext.Array.each(ticketArray, function(docID) {

    		Ext.Ajax.request({
	                method: 'POST',
	                scope: this,
	                url: '_update/transferTicket/'+docID+'?customerDocID='+customerDoc+'&contactDocID='+contactDoc,			
	                // Die Formular-Eingaben uebergeben
	                counter: counter++,
	                success: function(response, request) {
	                		Ext.example.msg('Transfer von Tickets', 'Ticket <b>'+request.counter+'</b> von <b>'+max+'</b> erfolgreich transferiert.');	
	                },
	                failure: function(){
	                 	Ext.example.msg('Transfer von Tickets', '<font color="red">Fehler beim Transfer der Tickets aufgetreten...</font>');	
	                }
	            });
	            
	            });

            
            win.close();
    		
    		} else {
    			 // Zeige Warnung - nicht alle Felder ausgefï¿½llt
            	boxWarningRequiredFields();	
    		}
    	
		
    },

    onCancelClick: function(button, e, eOpts) {
		this.close();
    },
    
    
	onCompanyComboBoxSelect: function(field, records, options) {
    	
        // Kontaktperson-Auswahl beim Wechsel eines Kunden zurücksetzen
        this.down('#contactPersonComboBox').reset();

        Ext.data.StoreManager.lookup('contactToCompanyStore').load({
            params: {
                "key": '"'+field.getValue()+'"'
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
    }

});