/*
 * File: app/view/ui/companyComboBox.js
 *
 * This file was generated by Sencha Designer version 2.0.0.
 * http://www.sencha.com/products/designer/
 *
 * This file requires use of the Ext JS 4.0.x library, under independent license.
 * License of Sencha Designer does not include license for Ext JS 4.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('cstt.view.ui.companyComboBox', {
    extend: 'Ext.form.field.ComboBox',

    name: 'company',
    fieldLabel: 'Kunde',
    allowBlank: false,
    emptyText: 'Kunde auswählen ...',
    selectOnFocus: true,
    displayField: 'company',
    forceSelection: true,
    queryMode: 'local',
    store: 'companyComboBoxStore',
    typeAhead: true,
    anyMatch: true,
    valueField: '_id',

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }
});