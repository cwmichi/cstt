Ext.define('cstt.view.ui.actionWindow', {
    extend: 'Ext.window.Window',

    autoShow: true,
    height: 600,
    width: 950,
    maximizable: true,
    title: 'Ticket: - Aktion ausführen',
    couchDBTicketDocID: null,
    showOneTicketExtJsID: 'null',
    actionCommentGridExtJsID: 'null',
    
    autoScroll: true,
    
    layout: {
    	type: 'fit'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
        	listeners: {
                beforerender: {
                    fn: me.onWindowBeforeRender,
                    scope: me
                }
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    itemId: 'bottomToolbar',
                    ui: 'footer',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'save',
                            text: 'Speichern',
                            listeners: {
                                click: {
                                    fn: me.onSaveClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            itemId: 'edit',
                            text: 'Änderungen speichern',
                            listeners: {
                                click: {
                                    fn: me.onEditClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            text: 'Abbrechen',
                            listeners: {
                                click: {
                                    fn: me.onCancelClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }],
                items: [
                {
				xtype: 'form',
				labelAlign: 'left',
				border: false,
				bodyPadding: 10,	
				frame: false,	
				layout: {
			    	type: 'fit'
			    },
				items: [{
					layout: 'column',
					border: false,
					items: [{
						columnWidth: .8,
						border: false,
						layout: 'anchor',
						itemId: 'column_left',
						items: [{
							xtype: 'hidden',
							name: 'staff_ID',
							itemId: 'staff_ID'
			
						},{
							xtype: 'hidden',
							itemId: 'createdOn',
							name: 'createdOn'
							// value: aktuelles datum
						},{
							xtype: 'displayfield',
							fieldLabel: 'Aktion',
							labelStyle: 'font-weight:bold;',
							width: 500,
							itemId: 'actionLabel'
						},{
							xtype: 'textfield',
							name: 'title',
							itemId: 'title',
							fieldLabel: 'Titel (optional)',
							allowBlank: true,
							width: 600
						},{	
							xtype: 'combobox',
			               	store: 'allStaffEmailStore',
			            	fieldLabel: 'E-Mail (optional)',
			            	name: 'emailTo',
							itemId: 'emailTo',
			            	anchor: '45%',
			                queryMode: 'local',
			            	triggerAction: 'all',
			            	displayField:'staff_name',
			                valueField: 'staff_email' ,
			            	emptyText: 'Mitarbeiter auswählen ...',
			            	allowBlank: true,
							multiSelect: true,
							forceSelection: true
							}
						,{
							xtype: 'csttHtmlEditor',
							itemId: 'comment',
							name: 'comment',
							 width: 700,
							 height: 400,
						     hideLabel: true,
							 allowBlank: false
						},{
							xtype: 'hidden',
							itemId: 'ticket_ID',
							name: 'ticket_ID'			
						},{
							xtype: 'hidden',
							name: 'type',
							value: 'ticket_comment'				
						},{
							xtype: 'hidden',
							itemId: 'status',
							name: 'status'
						},{
							xtype: 'hidden',
							itemId: 'action',
							name: 'action'
						}]
					},{
						columnWidth: .2,
						title: '',
						frame: true,
						hidden: true,
						border: false,
						itemId: 'fieldsetCustomerFiles'						
					}]	
				}]
				
				}
            ]
        });

        me.callParent(arguments);
    },
    
    onWindowBeforeRender: function(abstractcomponent, options) {

    },

    onSaveClick: function(button, e, options) {
    },

    onEditClick: function(button, e, options) {
    },

    onCancelClick: function(button, e, options) {
    }

});