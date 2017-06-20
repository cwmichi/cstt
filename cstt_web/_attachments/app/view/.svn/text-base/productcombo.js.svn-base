Ext.define('cstt.view.productcombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.productcombo',

    fieldLabel: 'anderes Produkt',
    name: 'product',
    emptyText: '(optional) anderes Produkt',
    displayField: 'name',
    forceSelection: true,
    queryMode: 'local',
    width: 360,
    store: 'productstore',
    valueField: 'value',
    
    beforeBlur: function(){
        var value = this.getRawValue();
        if(value == ''){
            this.lastSelection = [];
        }
        this.doQueryTask.cancel();
        this.assertValue();
    },

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }

});