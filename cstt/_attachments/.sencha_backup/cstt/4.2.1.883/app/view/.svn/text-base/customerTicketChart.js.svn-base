Ext.define('cstt.view.customerTicketChart', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.customerTicketChart',
    
    animate: true,
    insetPadding: 20,
    store: 'customerTicketChartStore',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            axes: [
                {
                    type: 'Category',
                    fields: [
                        'key'
                    ],
                    position: 'left',
                    label: {
                    	renderer: function(value) {
                    		var index = Ext.data.StoreManager.lookup('companyConvertStore').findExact('_id',value);
	
					    	var companyName = value;
							if (index >= 0) {
								companyName = Ext.data.StoreManager.lookup('companyConvertStore').getAt(index).data.company;
							}
							return companyName;
						}
                    },
                    title: 'Kunden'
                },
                {
                    type: 'Numeric',
                    fields: [
                        'value'
                    ],
                    adjustMinimumByMajorUnit: true,
                    position: 'bottom',
                    title: 'Support Tickets (Anzahl)'
                }
            ],
            series: [
            	{
                    type: 'bar',
                    label: {
                        display: 'insideEnd',
                        field: 'value',
                        color: '#333',
                        'text-anchor': 'middle'
                    },
                    tips: {
	                  trackMouse: true,
	                  width: 200,
	                  height: 30,
	                  renderer: function(storeItem, item) {
	                  	
	                  	var value = storeItem.get('key');
	                  	var index = Ext.data.StoreManager.lookup('companyConvertStore').findExact('_id',value);
	
				    	var companyName = value;
						if (index >= 0) {
							companyName = Ext.data.StoreManager.lookup('companyConvertStore').getAt(index).data.company;
						}

	                    this.setTitle(Ext.String.ellipsis(companyName, 25, true) + ' (' + storeItem.get('value') + ')');
	                  }
	                },
                    axis: 'bottom',
                    xField: 'key',
                    yField: [
                        'value'
                    ]
                }
          
            ]
        });

        me.callParent(arguments);
    }

});