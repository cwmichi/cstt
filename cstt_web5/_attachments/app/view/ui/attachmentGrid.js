/*
 * File: app/view/ui/attachmentGrid.js
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

Ext.define('cstt.view.ui.attachmentGrid', {
    extend: 'Ext.grid.Panel',

    autoScroll: true,
    title: 'Dateianhänge',
    store: 'ticketAttachmentsStore',
    overflow: 'auto',
    couchDBDocID: 'null',
    anchor: '100%',
	forceFit: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                emptyText: 'Keine Dateianhänge vorhanden ...',
                loadingText: 'Lade Dateianhänge ...'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    itemId: 'topToolbar',
                    width: 645,
                    dock: 'top',
                    ui: 'footer',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'reloadButton',
                            iconCls: 'x-tbar-loading',
                            text: 'Aktualisieren',
                            tooltip: 'Aktualisieren ...',
                            listeners: {
                                click: {
                                    fn: me.onRefreshClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'add',
                            text: 'Datei hochladen',
                            tooltip: 'Neue Datei hochladen ...',
                            listeners: {
                                click: {
                                    fn: me.onUploadClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'remove',
                            text: 'Datei löschen',
                            tooltip: 'Löscht die ausgewählte Datei ...',
                            listeners: {
                                click: {
                                    fn: me.onDeleteClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 350,
                    dataIndex: 'filename',
                    renderer: render_attachment,
                    text: 'Dateiname'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    renderer: Ext.util.Format.fileSize,
                    dataIndex: 'filesize',
                    text: 'Größe'
                }
            ]
        });

        me.callParent(arguments);
    },

    onRefreshClick: function(button, e, options) {
    },

    onUploadClick: function(button, e, options) {
    },

    onDeleteClick: function(button, e, options) {
    }

});