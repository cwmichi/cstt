Ext.define('cstt.model.kbModel', {
    extend: 'Ext.data.Model',
    alias: 'model.kbModel',

    proxy: {
        type: 'ajax',
        url: '_view/kb?descending=true',
        reader: {
            type: 'json',
            idProperty: 'kbid',
            root: 'rows',
            successProperty: 'ok',
            totalProperty: 'total_rows',
            record: 'value'
        },
        directionParam : '',
        filterParam : '',
        groupParam : '',
        limitParam : 'limit',
        pageParam : '',
        sortParam : '',
        startParam : 'skip'
    },

    fields: [
        {
            name: 'kbid'
        },
        {
        	name: 'ticket_doc'
        },
        {
        	name: 'title'
        },
        {
        	name: 'solution'
        }
    ]
});