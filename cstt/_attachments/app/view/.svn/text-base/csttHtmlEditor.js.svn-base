Ext.define('cstt.view.csttHtmlEditor', {
    extend: 'Ext.form.field.HtmlEditor',
    alias: 'widget.csttHtmlEditor',
    
    resizable: true,

    initComponent: function() {
        var me = this;
        
        Ext.applyIf(me, {
            listeners: {
                afterrender: {
                    fn: me.onHtmleditorAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onHtmleditorAfterRender: function(component, eOpts) {
    	
    	var tb = component.toolbar;
    	
        tb.add({xtype: 'tbseparator'});
        
        tb.add({
        	itemId: 'csttImageInsert',
            iconCls: 'images',
            overflowText: 'Bild einf&uuml;gen',
            tooltip: 'Bild einf&uuml;gen',
            scope: this,
            handler: function() {
            	var win = Ext.widget('insertImageWindow');
            	
            	var docId;
				
            	if(component.up('window') !== undefined && !Ext.isEmpty(component.up('window').couchDBTicketDocID)) {
            		docId = component.up('window').couchDBTicketDocID;
            	} else if(!Ext.isEmpty(component.up('panel').couchDBDocID)) {
            		docId = component.up('panel').couchDBDocID;
            	} else if(!Ext.isEmpty(component.up('newTicketForm').couchDBDocID)) {
            		docId = component.up('newTicketForm').couchDBDocID;
            	} else {
            		boxErrorGeneralError();
            	}
            	
            	win.couchDBDocID = docId;
            	win.csttHtmlEditorID = this.getId();
            	
            	
            	win.store.load({
                	params: {
                    "key": '"'+docId+'"'
                	}
           		 });
            
            
            }
        });

    }

});