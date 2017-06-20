Ext.define('cstt.store.themestore', {
    extend: 'Ext.data.Store',
    alias: 'store.themestore',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'themestore',
            data: [
                {
                    value: 'access',
                    name: 'Accessibility'
                },
                {
                    value: 'classic',
                    name: 'Classic'
                },
                {
                    value: 'gray',
                    name: 'Gray'
                },
                {
                    value: 'neptune',
                    name: 'Neptune'
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