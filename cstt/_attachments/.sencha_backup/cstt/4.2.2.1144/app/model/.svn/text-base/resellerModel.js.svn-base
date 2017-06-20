Ext.define('cstt.model.resellerModel', {
    extend: 'Ext.data.Model',
    alias: 'model.resellerModel',

    proxy: {
        type: 'ajax',
        url: '_view/resellerCombo',
        reader: {
            type: 'json',
            idProperty: '_id',
            root: 'rows',
            successProperty: 'ok',
            totalProperty: 'total_rows',
            record: 'value'
        },
        extraParams: {
            key: '"reseller"'
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
        	name: 'company'
        }
    ]
});