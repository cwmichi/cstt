Ext.define('cstt.store.yearStore', {
    extend: 'Ext.data.Store',
 	requires: [
        'cstt.model.yearModel'
    ],
   constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	autoLoad: true,
            storeId: 'yearStore',
            model: 'cstt.model.yearModel'
        }, cfg)]);
    }

});