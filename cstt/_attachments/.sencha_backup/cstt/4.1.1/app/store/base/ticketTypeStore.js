/*
 * File: app/store/base/ticketTypeStore.js
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

Ext.define('cstt.store.base.ticketTypeStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'ticketTypeStore',
            data: [
                [
                    0,
                    'Incident'
                ],
                [
                    1,
                    'Service Request'
                ],
                [
                    2,
                    'Projektstatus'
                ]
            ],
            fields: [
                {
                    mapping: 0,
                    name: 'value'
                },
                {
                    mapping: 1,
                    name: 'ticketType'
                }
            ]
        }, cfg)]);
    }
});