/**
 * @author Michael Scharrer
 */

Ext.define('cstt.view.settingsWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.settingsWindow',

    title: 'Einstellungen',
    
    requires: [
    	'cstt.view.themecombo'
    ],
    
    
    height: 600,
    width: 800,
    autoShow: true,
    layout: {
        type: 'border'
    },
    iconCls: 'settings_ext',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
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
                            itemId: 'cancel',
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
            ],
            items: [
                {
                    xtype: 'panel',
                    region: 'west',
                    border: false,
                    itemId: 'west_panel',
                    ui: 'footer',
                    width: 170,
                    layout: {
                        type: 'fit'
                    },
                    collapsible: true,
                    split: true,
                    items: [
                        {
                            xtype: 'toolbar',
                            autoScroll: true,
                            border: false,
                            vertical: true,
                            items: [
                                {
                                    xtype: 'button',
                                    iconCls: 'user_design_32',
                                    iconAlign: 'top',
                            		scale: 'large',
                                    itemId: 'btn_change_design',
                                    text: 'Design ändern'
                                },
                                {
                                    xtype: 'tbseparator'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'form',
                    region: 'center',
                    boder: false,
                    itemId: 'form_center',
                    defaults: {
                        bodyPadding: 10,
                        border: false,
                        autoScroll: true
                    },
                    layout: {
                        type: 'card'
                    },
                    // bodyPadding muss 0 sein!, damit die Panel Title´s passen
                    bodyPadding: 0,
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            iconCls: 'user_design_16',
                            itemId: 'panel_design',
                            title: 'Design ändern',
                           	items: [
                            	{
                                    xtype: 'label',
                                    html: 'In diesen Einstellungen können Sie selbst definieren, welches Design für die Weboberfläche verwendet wird.<br><br>Wählen Sie hierfür aus der unteren Auswahlliste ein geeignetes Design aus.<br><br>'
                                },
                                {
                                	xtype: 'themecombo',
                                	value: Ext.util.Cookies.get('csttthemecookie') || 'neptune',
                                	width: 250
                                }
                           	]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onSaveClick: function(button, e, options) {
		Ext.Msg.alert('Noch nicht implementiert.');
    },

    onCancelClick: function(button, e, options) {
        this.close();
    }

});