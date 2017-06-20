Ext.define('cstt.store.companyComboBoxStore', {
    extend: 'Ext.data.Store',
    
    requires: [
        'cstt.model.companyComboBoxModel'
    ],


      constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'companyComboBoxStore',
            model: 'cstt.model.companyComboBoxModel',
            sorters: [
                {
                    property: 'company',
                    direction: 'ASC'
                }
            ]
        }, cfg)]);
    }

});