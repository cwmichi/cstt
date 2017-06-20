Ext.define('cstt.model.commentModel', {
    extend: 'Ext.data.Model',

    idProperty: '_id',

    proxy: {
        type: 'rest',
        api: {
            create: '../../',
            read: '_view/ticketComment?include_docs=true',
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
            record: 'doc'
        },
         writer: {
            //nameProperty: 'mapping',
            type: 'json',
            allowSingle: true,
            encode: false,
            writeAllFields: true,
            root: ''
        },
         listeners: {
                exception: {
                    fn:  function(proxy, response, operation){
                   
                          var obj = Ext.JSON.decode(response.responseText);                 
                          var error = obj.error, reason = obj.reason;    
                                  
                            Ext.MessageBox.show({
                                title: 'Datenbank-Fehler',
                                msg: 'Fehler: '+error+'<br />Ursache: '+reason,
                                icon: Ext.MessageBox.ERROR,
                                buttons: Ext.Msg.OK
                            });
                }
              }
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
            name: 'staff_ID',
            type: 'string'
        },
        {
            name: 'ownerConvert',
            mapping: 'staff_ID',
            convert: convertOwnerName,
            type: 'string'
        },
        {
            name: 'comment',
            type: 'string'
        },
        {
            name: 'status',
            type: 'string',
            useNull: true
        },
        {
            name: 'reqFiles',
            type: 'string'
        },
        {
            name: 'title',
            type: 'string'
        },
        {
            name: 'emailTo',
            type: 'string'
        },
        {
            name: 'createdOn',
            type: 'string',
            dateFormat: 'Y-m-d H:i:s'
        },
        {
            name: 'createdOnColumn',
            type: 'date',
            mapping: 'createdOn',
            dateFormat: 'Y-m-d H:i:s'
        },
        {
            name: 'ticket_ID',
            type: 'string'
        },
        {
            defaultValue: 'ticket_comment',
            name: 'type',
            type: 'string'
        }
    ]
});		