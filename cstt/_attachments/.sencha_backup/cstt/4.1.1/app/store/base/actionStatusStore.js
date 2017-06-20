Ext.define('cstt.store.base.actionStatusStore', {
    extend: 'Ext.data.Store',
    requires: [
        'cstt.model.actionStatusModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'actionStatusStore',
            model: 'cstt.model.actionStatusModel',
            data: [
                {
                    statusText: 'In Bearbeitung (Support)',
                    status: '2'
                },
                {
                    statusText: 'In Bearbeitung (Kunde)',
                    status: '3'
                },
                {
                    statusText: 'Entwicklung (Derbystrasse)',
                    status: '4'
                },
                {
                    statusText: 'Lösungsvorschlag an Kunde',
                    status: '5'
                },
                {
                    statusText: 'Eskalation (2nd Level)',
                    status: '6'
                },
                {
                    statusText: 'Eskalation (Vertrieb)',
                    status: '7'
                },
                {
                    statusText: 'Ticket zurückstellen',
                    status: '8'
                },
                {
                    statusText: 'Entwicklung (Hauptplatz)',
                    status: '9'
                }
            ]
        }, cfg)]);
    }
});