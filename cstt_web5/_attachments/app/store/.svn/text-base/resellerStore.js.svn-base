Ext.define('cstt.store.resellerStore', {
    extend: 'Ext.data.Store',
 	requires: [
        'cstt.model.resellerModel'
    ],
   constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	autoLoad: true,
            storeId: 'resellerStore',
            model: 'cstt.model.resellerModel',
            sorters: [
                {
                    property: 'company',
                    direction: 'ASC'
                }
            ],
            listeners: {
                load: {
                    fn: me.onStoreLoad,
                    scope: me
                }
           }
        }, cfg)]);
    },
    onStoreLoad: function(store, records, successful, options) {
    
    	var all = Ext.create('cstt.model.resellerModel',{
    		_id: 'none',
    		company: '-- kein Reseller --'
    	});
    	
    	store.insert(0, all);
    	
    	all.commit(true);

    }

});