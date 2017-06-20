
Ext.define('cstt.store.base.deleteFileStore', {
    extend: 'Ext.data.Store',
    requires: [
        'cstt.model.deleteFileModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'deleteFileStore',
            model: 'cstt.model.deleteFileModel',
            data: [
                {
                    reason: 'Falsche Datei'
                },
                {
                    reason: 'Sonstige'
                }
            ]
        }, cfg)]);
    }
});