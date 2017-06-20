Ext.define('cstt.view.showKBArticle', {
    extend: 'Ext.window.Window',
    alias: 'widget.showKBArticle',

    height: 415,
    width: 720,
    maximizable: true,
    bodyPadding: 5,
    autoShow: false,
    
    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    itemId: 'bottomToolbar',
                    ui: 'footer',
                    dock: 'bottom',
                    items: [
                    {
                            xtype: 'button',
                            iconCls: 'print',
                            text: 'Drucken',
                            listeners: {
                                click: {
                                    fn: me.onPrintClick,
                                    scope: me
                                }
                            }
                        },
                        {xtype: 'tbseparator'},
                        {
                            xtype: 'button',
                            text: 'Schließen',
                            listeners: {
                                click: {
                                    fn: me.onCloseClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'displayfield',
                    itemId: 'kbid',
                    submitValue: false,
                    fieldLabel: 'KB-Artikel',
                    labelStyle: 'font-weight:bold;'
                },
                {
                    xtype: 'displayfield',
                    itemId: 'title',
                    submitValue: false,
                    fieldLabel: 'Beschreibung',
                    labelStyle: 'font-weight:bold;'
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    itemId: 'solution',
                    autoScroll: true,
                    bodyPadding: 5,
                    overflow: 'auto'
                }
            ]
        });

        me.callParent(arguments);
    },
    
    onPrintClick: function(button, e, options) {
    	Ext.util.ms_print(this);
    },

    onCloseClick: function(button, e, options) {
    	this.close();
    },
    
    updateContent: function(record) {
    	this.setTitle('Zeige KB-Artikel: '+record.get('kbid'));
    	this.down('#kbid').setValue(record.get('kbid'));
		this.down('#title').setValue(record.get('title'));
		this.down('#solution').update(record.get('solution'));
				
		this.doLayout();
		
		this.show();
				
    }

});