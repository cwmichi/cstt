/*
 * File: app/view/ui/ticketPieChart.js
 *
 * This file was generated by Sencha Designer version 2.0.0.
 * http://www.sencha.com/products/designer/
 *
 * This file requires use of the Ext JS 4.0.x library, under independent license.
 * License of Sencha Designer does not include license for Ext JS 4.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('cstt.view.ui.ticketPieChart', {
    extend: 'Ext.chart.Chart',

    height: 481,
    width: 664,
    animate: true,
    insetPadding: 20,
    store: 'chartTicketStore',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            series: [
            	{
	        type: 'pie',
	        angleField: 'value',
	        showInLegend: true,
	        tips: {
	            trackMouse: true,
	            width: 350,
	            height: 28,
	            renderer: function(storeItem, item) {
	                // calculate and display percentage on hover
	                var total = 0;
	                var store = Ext.data.StoreManager.lookup('chartTicketStore');
	                store.each(function(rec) {
	                    total += rec.get('value');
	                });
	                
	                var product = renderer_product(storeItem.get('product'));
	                
	                this.setTitle(storeItem.get('key') + ' ('+product +'): '+storeItem.get('value')+' - ' + Math.round(storeItem.get('value') / total * 100) + '%');
	            }
	        },
	        highlight: {
	            segment: {
	                margin: 20
	            }
	        },
	        label: {
	            field: 'key',
	            display: 'rotate',
	            contrast: true,
	            font: '18px Arial'
	        }
	    }
    ]
        });
        me.callParent(arguments);
    }

});