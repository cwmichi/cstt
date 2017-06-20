Ext.define('cstt.view.changePasswordWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.changePasswordWindow',

   	height: 180,
    width: 470,
    layout: {
        type: 'fit'
    },
    title: 'Passwort &auml;ndern',
    autoShow: true,
    iconCls: 'application_key',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'btnChangePassword',
                            text: 'Passwort &auml;ndern',
                            listeners: {
                                click: {
                                    fn: me.onBtnChangePasswordClick,
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
            ],
            items: [
                {
                    xtype: 'form',
                    border: false,
                    defaults: {
                        labelWidth: 140
                    },
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            inputType: 'password',
                            itemId: 'oldPassword',
                            allowBlank: false,
                            submitValue: false,
                            fieldLabel: 'Altes Passwort'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            inputType: 'password',
                            allowBlank: false,
                            submitValue: false,
                            itemId: 'newPasswordInput',
                            fieldLabel: 'Neues Passwort'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            inputType: 'password',
                            allowBlank: false,
                            submitValue: false,
                            initialPassField: 'newPasswordInput',
                            fieldLabel: 'Passwort wiederholen',
                            vtype: 'password'
                        },
                        {
                        	xtype: 'hiddenfield',
                        	name: 'password',
                        	itemId: 'newPassword'
                        	
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onBtnChangePasswordClick: function(button, e, options) {
    	
    	var win = button.up('window'),
    		form = win.down('form');
    		
    	if (form.getForm().isValid()) {
    		
    		
    		var oldPassword = Ext.util.csttMD5(form.down('#oldPassword').getValue());

    		if (oldPassword == sessionPassword) {
    		var newPassword = Ext.util.csttMD5(form.down('#newPasswordInput').getValue());
    		
    		form.down('#newPassword').setValue(newPassword);
    		
    			Ext.Ajax.request({
	                method: 'POST',
	                scope: this,
	                url: '../../_design/cstt/_update/updateNewPassword/'+sessionUserID,		
	                // Die Formular-Eingaben uebergeben
	                params: form.getForm().getValues(),
	                success: function() {
	                
	                	Ext.util.Cookies.clear("CSTTLogin2013");
	                	
	                	function showResult(btn) {
	                		if(btn == 'ok') {
	                		
	                			window.location = 'index.html';
	                			
	                			
	                		}
	                	}
	                	
	                	Ext.MessageBox.show({
				           title: 'Passwort wurde ge&auml;ndert',
				           msg: 'Das Passwort wurde erfolgreich ge&auml;ndert. Bitte melden Sie sich erneut an!',
				           buttons: Ext.MessageBox.OK,
				           fn: showResult,
				           closable: false,
				           icon: Ext.MessageBox.INFO
				       });
	                	
	                	
	                	
	                }
	            });
    		}
    		else {
    		
    		 	Ext.MessageBox.show({
                            title: 'Passwort &auml;ndern',
                            msg: 'Das alte Passwort stimmt nicht &uuml;berein!',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });	
    		
    		}
    		
    		
    	} else {
    		 // Zeige Warnung - nicht alle Felder ausgefuellt
            boxWarningRequiredFields();
    	}

    },

    onCancelClick: function(button, e, options) {
        button.up('window').close();
    }

});