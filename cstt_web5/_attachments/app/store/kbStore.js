Ext.define('cstt.store.kbStore', {
    extend: 'Ext.data.Store',
 	requires: [
        'cstt.model.kbModel'
    ],
   constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	autoLoad: false,
        	autoSync: false,
            storeId: 'kbStore',
            model: 'cstt.model.kbModel',
            sorters: [
                {
                    property: 'kbid',
                    direction: 'DESC'
                }
            ]
        }, cfg)]);
    }

});