Ext.define('cstt.model.staffChartTicketModel', {
    extend: 'Ext.data.Model',

    idProperty: '_id',

    fields: [
        {
            name: 'key',
            mapping: 'key[1]',
            type: 'auto'
        },
        {
            name: 'value',
            type: 'int'
        }
    ],

    proxy: {
        type: 'rest',
        batchActions: true,
        api: {
            create: '../../',
            read: '_view/staffTicketChart?group=true',
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
            idProperty: '_id',
            root: 'rows',
            successProperty: 'ok',
            totalProperty: 'total_rows',
            record: ''
        }
    }
});