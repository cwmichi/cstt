Ext.define('cstt.controller.customer', {
    extend: 'Ext.app.Controller',
    
    views: [
        'customerGrid'
    ],
    
    init: function() {
        this.control({
            "customerGrid": {
                cellclick: this.customerGridCellClick
            }
        });
    },

    customerGridCellClick: function(tablepanel, record, item, index, e, options) {

        switch(item) {			
            // Kontaktpersonen
            case 3:
            // Kontaktpersonen zum Kunden anzeigen
            var window = Ext.widget('contactsToCustomerWindow');
            window.couchDBDocID = index.get('_id');
            window.setTitle('Kontaktpersonen zu Kunde: '+index.get('company'));
            window.down('contactPersonGrid').couchDBDocID = index.get('_id');
            window.down('contactPersonGrid').onRefreshClick();
            window.down('contactPersonGrid').getView().refresh();
            window.down('contactPersonGrid').setHeight(340);
            window.show();
            
            break;
            // Details
            case 4:
            // Details zum Kunden anzeigen
            var window = Ext.widget('detailsToCustomerWindow');
            window.couchDBDocID = index.get('_id');
            window.updateContent();
            break;
        }
    }

});