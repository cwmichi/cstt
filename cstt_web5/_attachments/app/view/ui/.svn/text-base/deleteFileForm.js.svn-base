Ext.define('cstt.view.ui.deleteFileForm', {
    extend: 'Ext.window.Window',

    autoShow: true,
    height: 400,
    width: 830,
    title: 'Datei l&ouml;schen',
    ExtJSattachmentGridID: 'null',
    layout: {
    	type: 'fit'
    },
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
                            value: 'test',
                            fieldLabel: 'Dateiname',
                            itemId: 'filename',
                            anchor: '100%'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Grund',
                            store: 'deleteFileStore',
                            name: 'reason',
                            queryMode: 'local',
                            valueField: 'reason',
                            displayField: 'reason',
                            allowBlank: false,
                            anchor: '40%'
                        },
                        {
                            xtype: 'htmleditor',
                            height: 184,
                            style: 'background-color: white;',
                            fieldLabel: 'Kommentar',
                            name: 'comment',
                            anchor: '100%'
                        },
                        {
                        	xtype: 'hidden',
                        	itemId: 'ticketDocID',
                        	name: 'ticketDocID'
                        },
                        {
                        	xtype: 'hidden',
                        	itemId: 'staff_ID',
                        	name: 'staff_ID'
                        },
                        {
                        	xtype: 'hidden',
                        	itemId: 'filenameHidden',
                        	name: 'filename'
                        },
                        {
                        	xtype: 'hidden',
                        	name: 'type',
                        	value: 'deleteFileTicket'
                        },
                        {
                        	xtype: 'hidden',
                        	itemId: 'time_deleted',
                        	name: 'time_deleted'
                        },
                        {
                        	xtype: 'hidden',
                        	itemId: 'ticketRevision',
                        	name: 'ticketRevision'
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    ui: 'footer',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Speichern / Datei l&ouml;schen',
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
    
    saveFormToCouchDB: function() {
    	
    },

    onSaveClick: function(button, e, options) {

    },

    onCancelClick: function(button, e, options) {

    }

});