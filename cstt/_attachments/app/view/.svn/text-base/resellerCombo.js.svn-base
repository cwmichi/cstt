Ext.define('cstt.view.resellerCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.resellerCombo',
    
    requires: [
    	'cstt.store.resellerStore'
    ],

    fieldLabel: 'Reseller',
    displayField: 'company',
    forceSelection: true,
    queryMode: 'local',
    typeAhead: true,
    store: 'resellerStore',
    valueField: '_id',
    name: 'containsReseller',
    value: 'none',

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }

});