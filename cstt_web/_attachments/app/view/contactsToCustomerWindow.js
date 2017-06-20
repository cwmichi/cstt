/*
 * File: app/view/contactsToCustomerWindow.js
 *
 * This file was generated by Sencha Designer version 2.0.0.
 * http://www.sencha.com/products/designer/
 *
 * This file requires use of the Ext JS 4.0.x library, under independent license.
 * License of Sencha Designer does not include license for Ext JS 4.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * You should implement event handling and custom methods in this
 * class.
 */

Ext.define('cstt.view.contactsToCustomerWindow', {
    extend: 'cstt.view.ui.contactsToCustomerWindow',
    alias: 'widget.contactsToCustomerWindow',

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },

    onWindowAfterRender: function(abstractcomponent, options) {
        this.add({
            xtype: 'contactPersonGrid',
            store: new Ext.data.Store({
                model: 'cstt.model.contactGridModel',
                sorters: [
                {
                    property : 'companyConvert',
                    direction: 'ASC'
                }
                ]
            }),	
            title: ''
        });
    },

    onCloseClick: function(button, e, options) {
        this.close();
    }

});