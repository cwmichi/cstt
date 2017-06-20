Ext.define('cstt.view.kbArticleGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.kbArticleGrid',

    title: 'KB-Artikel',
  	// forceFit: true,
    autoScroll: true,
    
    store: 'kbStore',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'kbid',
                    width: 120,
                    text: 'KB-Artikel'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'title',
                    width: 400,
                    text: 'Beschreibung'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'solution',
                    flex: 1,
                    text: 'Lösung'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    ui: 'footer',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'reload',
                            iconCls: 'x-tbar-loading',
                            listeners: {
                                click: {
                                    fn: me.onReloadClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                           xtype: 'button',
                            itemId: 'open_kb',
                            iconCls: 'go',
                            text: 'KB-Artikel öffnen',
                            listeners: {
                                click: {
                                    fn: me.onOpen_kbClick,
                                    scope: me
                                }
                            }
                        }, {
                            xtype: 'tbseparator'
                        }, {
                        	xtype: 'button',
                        	itemId: 'search',
                        	iconCls: 'search',
                        	text: 'Suche ...',
                        	listeners: {
                        		click: {
                                    fn: me.onSearchClick,
                                    scope: me
                                }
                        	}
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    afterPageText: 'von {0}',
                    beforePageText: 'Seite',
                    displayInfo: true,
                    displayMsg: '<b>Zeige {0} - {1} von {2} KB-Artikel</b>',
                    emptyMsg: 'Keine KB-Artikel vorhanden',
                    firstText: 'Erste Seite',
                    lastText: 'Letzte Seite',
                    nextText: 'Nächste Seite',
                    prevText: 'Vorherige Seite',
                    store: this.store,
                    refreshText: 'Aktualisieren'
                }
            ]
        });

        me.callParent(arguments);
    },
    
    onReloadClick: function(button, e, eOpts) {
		this.store.load();
    },

    onOpen_kbClick: function(button, e, eOpts) {
		var selectKB = this.getView().getSelectionModel().getSelection()[0];
		
		if(selectKB) {
			
			var win = Ext.widget('showKBArticle');
			
				win.updateContent(selectKB);
			
		} else {
			Ext.MessageBox.show({
                title: 'Hinweis',
                msg: 'Bitte wählen Sie zuerst einen Knowledge-Base Artikel aus, den Sie öffnen möchten.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
		}
		
    },
    
    onSearchClick: function(button, e, eOpts) {
    	Ext.Msg.alert('Suche wird erst noch implementiert.');	
    }

});