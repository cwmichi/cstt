Ext.define('cstt.model.yearModel', {
    extend: 'Ext.data.Model',
    alias: 'model.yearModel',

    proxy: {
        type: 'ajax',
        url: '_view/chartYear?group=true&descending=false',
        reader: {
            type: 'json',
            idProperty: '_id',
            root: 'rows',
            successProperty: 'ok',
            totalProperty: 'total_rows',
            record: ''
        },
        directionParam : '',
        filterParam : '',
        groupParam : '',
        limitParam : '',
        pageParam : '',
        sortParam : '',
        startParam : ''
    },

    fields: [
        {
            name: '_id'
        },
        {
        	name: 'key'
        },
        {
            name: 'value'
        }
    ]
});