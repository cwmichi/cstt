Ext.define('cstt.view.saveChartButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.saveChartButton',
	iconCls: 'picture_save',
    text: 'Grafik speichern',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            menu: {
                xtype: 'menu',
                items: [
                    {
                        xtype: 'menuitem',
                        itemId: 'jpeg',
                        text: 'JPEG-Datei',
                        listeners: {
                            click: {
                                fn: me.onJpegClick,
                                scope: me
                            }
                        }
                    },
                    {
                        xtype: 'menuitem',
                        itemId: 'png',
                        text: 'PNG-Datei',
                        listeners: {
                            click: {
                                fn: me.onPngClick,
                                scope: me
                            }
                        }
                    }/*,
                    {
                        xtype: 'menuitem',
                        itemId: 'svg',
                        text: 'SVG(XML)-Datei',
                        listeners: {
                            click: {
                                fn: me.onSvgClick,
                                scope: me
                            }
                        }
                    }*/
                ]
            }
        });

        me.callParent(arguments);
    },
// TODO: Chart save bricht _changes Feed ab !
    onJpegClick: function(item, e, options) {

    	var toolbar = item.up('toolbar');
    	var panel = toolbar.up('panel');
    	var chart = panel.down('chart');
    	
        Ext.MessageBox.confirm('Grafik speichern', 'Möchten Sie das Diagramm als JPEG-Datei herunterladen?', function(choice){
            if(choice == 'yes'){
                chart.save({
                    type: 'image/jpeg'
                });
            }
        });
    },

    onPngClick: function(item, e, options) {
        
        var toolbar = item.up('toolbar');
    	var panel = toolbar.up('panel');
    	var chart = panel.down('chart');

        Ext.MessageBox.confirm('Grafik speichern', 'Möchten Sie das Diagramm als PNG-Datei herunterladen?', function(choice){
            if(choice == 'yes'){
                chart.save({
                    type: 'image/png'
                });
            }
        });
    },

    onSvgClick: function(item, e, options) {
         
		var toolbar = item.up('toolbar');
    	var panel = toolbar.up('panel');
    	var chart = panel.down('chart');

        Ext.MessageBox.confirm('Grafik speichern', 'Möchten Sie das Diagramm als SVG(+XML)-Datei herunterladen?', function(choice){
            if(choice == 'yes'){
                chart.save({
                    type: 'image/svg+xml'
                });
            }
        });
    }

});