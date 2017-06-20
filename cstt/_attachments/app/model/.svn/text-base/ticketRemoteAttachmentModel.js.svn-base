Ext.define('cstt.model.ticketRemoteAttachmentModel', {
    extend: 'Ext.data.Model',

    idProperty: 'filename',

    proxy: {
        type: 'rest',
        api: {
            create: '../../',
            read: '_view/tvs',
            update: '../../',
            destroy: '../../'
        },
        directionParam : '',
        filterParam : '',
        groupParam : '',
        limitParam : '',
        pageParam : '',
        sortParam : '',
        startParam : '',
        url: 'http://localhost:5984',
        reader: {
            type: 'json',
            idProperty: 'filename',
            root: 'rows',
            successProperty: 'ok',
            totalProperty: 'total_rows',
            record: 'value'
        }
    },

    fields: [
        {
            name: '_id',
            type: 'string'
        },
        {
            name: '_rev',
            type: 'string'
        },
        {
            name: 'filename',
            type: 'string'
        },
        {
            name: 'filesize',
            type: 'int'
        }
    ]
});