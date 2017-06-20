Ext.define('cstt.view.exportTickets', {
    extend: 'Ext.window.Window',
    alias: 'widget.exportTickets',

    height: 160,
    width: 470,
    layout: {
        type: 'fit'
    },
    
    autoShow: true,
    
    ticketArray: new Array(),
    
    customerDocID: null,
    
    title: 'Export von Tickets als E-Mail',

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
							xtype: 'combobox',
			               	store: 'allStaffEmailStore',
			            	fieldLabel: 'Empf&auml;nger',
			            	name: 'emailTo',
							itemId: 'emailTo',
			            	anchor: '80%',
			                queryMode: 'local',
			            	triggerAction: 'all',
			            	displayField:'staff_name',
			                valueField: 'staff_email' ,
			            	emptyText: 'Mitarbeiter auswählen ...',
			            	allowBlank: false,
							//multiSelect: true,
							forceSelection: true
						},
                        {
                            xtype: 'checkboxfield',
                            itemId: 'actions',
                            anchor: '100%',
                            fieldLabel: 'Aktionen',
                            name: 'actions',
                            boxLabel: 'Aktionen zu einem Ticket werden exportiert',
                            inputValue: 'true',
                            checked: true,
                            uncheckedValue: 'false'
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
                            itemId: 'export',
                            text: 'Exportieren',
                            listeners: {
                                click: {
                                    fn: me.onExportClick,
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

    onExportClick: function(button, e, eOpts) {
    	var win = button.up('window'),
    		form = win.down('form'),
    		ticketArray = this.ticketArray;
    		
    		var jsonObj = {
			  emailTo: form.down('#emailTo').getValue(),
			  ticketArray: this.ticketArray,
			  actions: form.down('#actions').getValue(),
			  search_keyword: Ext.data.StoreManager.lookup('searchStore').searchValue,
			  customerDoc: this.customerDocID
			};
    		
    		if(form.getForm().isValid()) {
    		
    		Ext.example.msg('Export von Tickets', 'Export l&auml;uft als Hintergrundprozess weiter...');	
    		
    		Ext.Ajax.request({
                method: 'POST',
                url: '../../_exportTickets',
                scope: this,
                // timeout 5 min
                timeout: 300*1000,
                // Header auf application/json setzen - CouchDB
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                // Die Formular-Eingaben uebergeben
                jsonData: jsonObj,
            	success: function(result, request ) {			
            		Ext.example.msg('Export von Tickets', 'Erfolgreich beendet...');	
                },
                failure: function(){
                 	Ext.example.msg('Export von Tickets', 'Fehler beim Export aufgetreten...');	
                }
            });
            
            win.close();
    		
    		} else {
    			 // Zeige Warnung - nicht alle Felder ausgefï¿½llt
            	boxWarningRequiredFields();	
    		}
    	
		
    },

    onCancelClick: function(button, e, eOpts) {
		this.close();
    }

});