Ext.define('cstt.store.staffTicketChartStore', {
    extend: 'Ext.data.Store',

    requires: [
        'cstt.model.staffChartTicketModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'staffTicketChartStore',
            model: 'cstt.model.staffChartTicketModel'
        }, cfg)]);
    }
});