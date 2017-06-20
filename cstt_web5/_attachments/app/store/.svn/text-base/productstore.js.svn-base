Ext.define('cstt.store.productstore', {
    extend: 'Ext.data.Store',
    alias: 'store.productstore',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'productstore',
            data: [
				{
                    value: 'akm',
                    name: 'Alarm Edition Konfigurationsmanager'
                },
                {
                    value: 'javaclient',
                    name: 'Cordaware Javaclient'
                },
                {
                    value: 'asm',
                    name: 'Alarm Edition Standortmanager'
                }
            ],
            fields: [
                {
                    name: 'value'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});