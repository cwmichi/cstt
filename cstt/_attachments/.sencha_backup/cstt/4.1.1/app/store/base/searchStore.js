/*
 * File: app/store/base/searchStore.js
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

Ext.define('cstt.store.base.searchStore', {
    extend: 'Ext.data.Store',
    requires: [
        'cstt.model.ticketCurrentModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'searchStore',
            model: 'cstt.model.ticketCurrentModel',
            sorters: [
                {
                    property: 'ticketNumber',
                    direction: 'DESC'
                }
            ],
            listeners: {
                beforeload: {
                    fn: me.onStoreBeforeLoad,
                    scope: me
                }
            }
        }, cfg)]);
    }
});