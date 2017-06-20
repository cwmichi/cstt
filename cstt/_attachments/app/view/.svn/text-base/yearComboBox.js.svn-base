Ext.define('cstt.view.yearComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.yearComboBox',

    name: 'year',
    fieldLabel: 'Jahr',
    emptyText: 'Jahr auswählen ...',
    selectOnFocus: true,
    displayField: 'value',
    queryMode: 'local',
    store: 'yearStore',
    typeAhead: true,
    valueField: 'key',
    // this is required to make the items selectable.
    tpl: Ext.create('Ext.XTemplate',
        '<tpl for=".">',
            '<div class="x-boundlist-item">{key} - (Gesamt: {value})</div>',
        '</tpl>'
    ),
    // template for the content inside text field
    displayTpl: Ext.create('Ext.XTemplate',
        '<tpl for=".">',
            '{key} - (Gesamt: {value})',
        '</tpl>'
    ),


 initComponent: function() {
        var me = this;


        me.callParent(arguments);
    }


});