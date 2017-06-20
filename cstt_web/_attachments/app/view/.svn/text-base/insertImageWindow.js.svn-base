Ext.define('cstt.view.insertImageWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.insertImageWindow',

    height: 768,
    width: 1024,
    layout: {
        type: 'fit'
    },
    title: 'Bildauswahl',
    autoShow: true,
    couchDBDocID: null,
    csttHtmlEditorID: null,
    maximizable: true,
    bodyPadding: 10,

    initComponent: function() {
        var me = this;
        
        me.store = new Ext.data.Store({
						model: 'cstt.model.ticketAttachmentsModel',
						listeners: {
			                load: {
			                    fn: function(store, records, successful, eOpts) {
			                    	
			                    	Ext.each(records, function(rec) {
   										var filename = rec.get('filename');
			                    	
				                    	// Nur folgende Dateiendungen werden in der Bildauswahl angezeigt
				                    	var regex = /^.*\.(gif|png|jpeg|jpg|bmp)$/i;
				                    	
				                    	if(regex.test(filename) === false) {
				                    		store.remove(rec);
				                    	}
			                    	});
			                    }
			                }
			            }
					});
       
        
 
        
        

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'dataview',
                    autoScroll: true,
                    overflow: 'auto',
                    
                    itemSelector: 'div',
                    
                    multiSelect: true,

		            trackOver: true,
		            overItemCls: 'x-item-over',
		            itemSelector: 'div.thumb-wrap',
		            emptyText: 'Keine Bilder verf&uuml;gbar',
		            
		            store: me.store,
            
		             tpl: [
		                '<tpl for=".">',
		                    '<div class="thumb-wrap" id="{name:stripTags}">',
		                        '<div class="thumb"><img src="../../{_id}/{filename}" title="{filename}"></div>',
		                        '<span><b>{filename}</b><br/><br/></span>',
		                    '</div>',
		                '</tpl>',
		                '<div class="x-clear"></div>'
		            ],
		            listeners: {
		                itemclick: {
		                    fn: me.onDataviewItemClick,
		                    scope: me
		                }
		            }
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
                            text: 'Fenster schlie&szlig;en',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    ui: 'footer',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Aktualisieren',
                            tooltip: 'Aktualisieren ...',
                            itemId: 'reload',
                            iconCls: 'x-tbar-loading',
                            listeners: {
                                click: {
                                    fn: me.onReloadClick,
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

    onButtonClick: function(button, e, eOpts) {
        button.up('window').close();
    },
    
    onReloadClick: function(button, e, eOpts) {
    	this.store.load({
                params: {
                    "key": '"'+this.couchDBDocID+'"'
                }
            });
    },
    
    onDataviewItemClick: function(dataview, record, item, index, e, eOpts) {
		var filename = record.get('filename'),
			id = record.get('_id');
			
		var path = "../../"+id+"/"+filename;
		
		var htmlImage = '<img src="'+path+'" title="'+filename+'">';
		
		var editor = Ext.getCmp(this.csttHtmlEditorID);
		
		if(!Ext.isEmpty(editor)) {
			var value = editor.getValue();
			editor.setValue(value+'<br/>'+htmlImage);
			
			this.close();
		}
    }

});