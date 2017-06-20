/*
 * File: app/view/ui/createVersionWindow.js
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

Ext.define('cstt.view.ui.createVersionWindow', {
    extend: 'Ext.window.Window',

    autoShow: true,
    height: 170,
    width: 400,
    resizable: false,
    layout: {
        type: 'fit'
    },
    bodyPadding: 5,
    title: 'Neue Version hinzufügen',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    border: false,
                    itemId: 'versionForm',
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'comboboxcomponent',
                            name: 'component',
                            fieldLabel: 'Komponente',
                            allowBlank: false,
                            emptyText: 'Komponente auswählen ...',
                            selectOnFocus: true,
                            displayField: 'component',
                            queryMode: 'local',
                            store: 'storeComponentServerClient',
                            typeAhead: true,
                            valueField: 'component',
                            anchor: '100%'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'versionTextfield',
                            name: 'version',
                            fieldLabel: 'Version',
                            vtype: 'versionBI',
                            allowBlank: false,
                            anchor: '100%'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'type',
                            value: 'versionOverview',
                            fieldLabel: 'Label',
                            anchor: '100%'
                        },
                        {
                            xtype: 'hiddenfield',
                            itemId: 'creator_ID',
                            name: 'creator_ID',
                            fieldLabel: 'Label'
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    itemId: 'bottomToolbar',
                    ui: 'footer',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'save',
                            text: 'Speichern',
                            listeners: {
                                click: {
                                    fn: me.onSaveClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            text: 'Abbrechen',
                            listeners: {
                                click: {
                                    fn: me.onCancelClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onSaveClick: function(button, e, options) {
    },

    onCancelClick: function(button, e, options) {
    }

});