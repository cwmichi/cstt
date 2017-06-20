Ext.define('cstt.view.resellerWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.resellerWindow',

    height: 190,
    width: 530,
    layout: {
        type: 'fit'
    },
    closable: false,
    modal: true,
    title: 'Kunde ist ein Reseller',
    extjsCompanyBoxID: null,

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
                            itemId: 'displayfieldCustomer',
                            value: '<b>Der ausgew&auml;hlte Kunde "{COMPANY}" ist ein Reseller!</b>'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            value: 'Bitte w&auml;hlen Sie aus der unteren Liste den entsprechenden Kunden aus:'
                        },
                        {
                            xtype: 'companyComboBox',
                            anchor: '70%',
                            store: new Ext.data.Store({
                            	model: 'cstt.model.resellerModel',
                            	sorters: [
					                {
					                    property: 'company',
					                    direction: 'ASC'
					                }
					            ]
                            })
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
                            itemId: 'cancel',
                            text: 'Abbrechen',
                            listeners: {
                                click: {
                                    fn: me.onCancelClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            itemId: 'next',
                            text: 'weiter',
                            listeners: {
                            	click: {
                            		fn: me.onNextClick,
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
    
    onCancelClick: function(button, e, options) {
		this.close();
    },
    
    onNextClick: function(button, e, options) {
    	var win = button.up('window'),
    		form = win.down('form');
    		
    	var value = form.down('companyComboBox').getValue();
    		
    	if(form.getForm().isValid()) {
    		// reset der ComboBox ist notwendig!
    		Ext.getCmp(this.extjsCompanyBoxID).reset();
    		Ext.getCmp(this.extjsCompanyBoxID).setValue(value);
    		
    		var combo = Ext.getCmp(this.extjsCompanyBoxID);
    		var newTicket = combo.up('newTicketForm');
    		
    		newTicket.onCompanyComboBoxSelect(combo, null, null);
    		
    		this.close();
    	} 
    	else {		
            // Zeige Warnung - nicht alle Felder ausgefüllt
            boxWarningRequiredFields();	
        }
    }
    
});