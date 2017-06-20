Ext.define('cstt.view.staffTicketChart', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.staffTicketChart',

    height: 600,
    width: 700,
    animate: true,
    insetPadding: 20,
    store: 'staffTicketChartStore',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            axes: [
                {
                    type: 'Category',
                    fields: [
                        'key'
                    ],
                    position: 'bottom',
                    title: 'Mitarbeiter',
                    label: {
                    	rotate: {
                    		degrees: 45
                    	},
                    	renderer: function(value) {
                    		var index = Ext.data.StoreManager.lookup('allStaffStore').findExact('_id',value);
	
					    	var ownerName = value;
							if (index >= 0) {
								ownerName = Ext.data.StoreManager.lookup('allStaffStore').getAt(index).data.staff_name;
							}
							return ownerName;
						}
                    }
                },
                {
                    type: 'Numeric',
                    fields: [
                        'value'
                    ],
                    position: 'left',
                    title: 'Support Tickets (Anzahl)'
                }
            ],
            series: [
                {
                    type: 'column',
                    label: {
                        display: 'insideEnd',
                        field: 'value',
                        color: '#333',
                        'text-anchor': 'middle'
                    },
                    tips: {
	                  trackMouse: true,
	                  width: 170,
	                  height: 28,
	                  renderer: function(storeItem, item) {
	                  	
	                  	var value = storeItem.get('key');
	                  	var index = Ext.data.StoreManager.lookup('allStaffStore').findExact('_id',value);
	
				    	var ownerName = value;
						if (index >= 0) {
							ownerName = Ext.data.StoreManager.lookup('allStaffStore').getAt(index).data.staff_name;
						}

	                    this.setTitle(ownerName + ' (' + storeItem.get('value') + ')');
	                  }
	                },
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