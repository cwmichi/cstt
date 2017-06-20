Ext.define('cstt.store.customerTicketChartStore', {
    extend: 'Ext.data.Store',

    requires: [
        'cstt.model.customerChartTicketModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'customerTicketChartStore',
            model: 'cstt.model.customerChartTicketModel'
        }, cfg)]);
    }
});