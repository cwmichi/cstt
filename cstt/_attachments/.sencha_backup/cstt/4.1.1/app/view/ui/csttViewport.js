/*
 * File: app/view/ui/csttViewport.js
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

Ext.define('cstt.view.ui.csttViewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'cstt.view.allTicketsGrid',
        'cstt.view.actionCommentGrid',
        'cstt.view.descriptionToCurrentTicket'
    ],

    id: 'viewport',
    autoScroll: true,
    layout: {
        type: 'border'
    },
    overflow: 'auto',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tabpanel',
                    id: 'centerTabPanel',
                    // AutoDestroy muss auf true sein!
                    autoDestroy: true,
                    defaults: {
                        deferredRender: false,
                        overflow: 'auto'
                    },
                    title: '',
                    activeTab: 0,
                    region: 'center',
                    items: [
                        {
                            xtype: 'panel',
                            itemId: 'currentTicketsTab',
                            listeners: {
                                activate: {
                                    fn: me.onCurrentTicketsTabActive,
                                    scope: me
                                }
                            },
                            autoScroll: true,
                            layout: {
                                type: 'anchor'
                            },
                            title: 'Support Tickets',
                            tabConfig: {
                                xtype: 'tab',
                                tooltip: 'Aktuelle Support Tickets'
                            },
                            items: [
                                {
                                    xtype: 'allTicketsGrid',
                                    anchor: '100%',
                                    //id: 'currentTicketsGrid',
                                    itemId: 'currentTicketsGrid',
                                    store: 'ticketCurrentStore'
                                },
                                {
                                    xtype: 'actionCommentGrid',
                                    height: 200,
                                    itemId: 'currentActionsGrid',
                                    store: 'actionstoTicketCurrent'
                                },
                                {
                                    xtype: 'descriptionToCurrentTicket',
                                    itemId: 'descriptionToCurrentTicketPanel'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    width: 200,
                    activeItem: 0,
                    layout: {
                        type: 'accordion'
                    },
                    collapsible: true,
                    title: 'Menü',
                    region: 'west',
                    items: [
                        {
                            xtype: 'panel',
                            width: 200,
                            activeItem: 0,
                            collapsed: false,
                            iconCls: 'report',
                            title: 'Support Tickets',
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'button',
                                            iconCls: 'report_add',
                                            text: 'Neues Ticket',
                                            tooltip: 'Erstellt ein neues Support Ticket ...',
                                            listeners: {
                                                click: {
                                                    fn: me.onNewTicketbuttonClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
				                    xtype: 'toolbar',
				                    dock: 'top',
				                    items: [
				                        {
				                            xtype: 'button',
				                            iconCls: 'search',
				                            text: 'Suche nach Tickets',
				                            tooltip: '&Ouml;ffnet ein Formular zur Suche ...',
				                            listeners: {
                                                click: {
                                                    fn: me.onPressSearch,
                                                    scope: me
                                                }
                                            }
				                        }
				                    ]
				                }
                            ],
                            items: [
                               /* {
                                    xtype: 'textfield',
                                    width: 200,
                                    name: 'search',
                                    fieldLabel: '',
                                    emptyText: 'Suchbegriff eingeben ...',
                                    listeners: {
                                        specialkey: {
                                            fn: me.onPressSearch,
                                            scope: me
                                        }
                                    }
                                },*/
                                {                                   
                                    xtype: 'allTicketsGrid',
                                    title: 'Tickets (letzten 24h)',
                                    height: 400,
                                    autoScroll: true,
                                    width: 200,
                                    overflow: 'auto',
                                    store: 'ticket24HoursStore',
                                    columns: [{
					                    xtype: 'gridcolumn',
					                    itemId: 'ticketNumberColumn',
					                    width: 75,
					                    hidden: true,
					                    dataIndex: 'ticketNumber',
					                    text: 'Nr.:'
					                },{
					                    xtype: 'gridcolumn',
					                    itemId: 'titleColumn',
					                    width: 200,
					                    dataIndex: 'title',
					                    text: 'Kurzbeschreibung'
					                }]                                    
                                }]
                        },
                        {
                            xtype: 'panel',
                            id: 'panelStatistics',
                            collapsed: true,
                            iconCls: 'chart_pie',
                            title: 'Statistiken',
                             dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            vertical: true,
	                            items: [
	                                {
	                                    xtype: 'button',
	                                    iconCls: 'chart_pie',
	                                    text: 'Ticket Statistik',
	                                    listeners: {
	                                        click: {
	                                            fn: me.pressTicketStatistic,
	                                            scope: me
	                                        }
	                                    }
	                                },
	                                {
	                                    xtype: 'button',
	                                    iconCls: 'chart_bar',
	                                    text: 'Mitarbeiter Statistik',
	                                    itemId: 'pressStaffTicketStatistic',
	                                    hidden: true,
	                                    listeners: {
	                                        click: {
	                                            fn: me.pressStaffTicketStatistic,
	                                            scope: me
	                                        }
	                                    }
	                                },
	                                {
	                                    xtype: 'button',
	                                    iconCls: 'chart_bar',
	                                    itemId: 'pressCustomerTicketStatistic',
	                                    text: 'Kunden Statistik',
	                                     listeners: {
	                                        click: {
	                                            fn: me.pressCustomerTicketStatistic,
	                                            scope: me
	                                        }
	                                    }
	                                }
	                            ]
	                        }
	                    ]
                        },
                       /* {
                            xtype: 'panel',
                            id: 'panelCalendar',
                            collapsed: true,
                            iconCls: 'calendar',
                            title: 'Kalender (Beta)',
                            items: [
                                {
                                    xtype: 'panel',
                                    border: 'false',
                                    iconCls: 'calendar',
                                    title: 'Kalender',
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    iconCls: 'calendar',
                                                    text: 'Kalender anzeigen'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },*/
                        {
                            xtype: 'panel',
                            id: 'panelSettings',
                            collapsed: true,
                            iconCls: 'settings',
                            title: 'Einstellungen'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: 'false',
                    height: 25,
                    itemId: 'statusBarPanel',
                    frameHeader: false,
                    region: 'south',
                    listeners: {
                        afterrender: {
                            fn: me.onStatusBarPanelAfterRender,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'toolbar',
                    height: 28,
                    itemId: 'topToolbar',
                    region: 'north',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'house',
                            text: 'Home',
                            tooltip: 'Home',
                            listeners: {
                                click: {
                                    fn: me.pressHomeButton,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'splitbutton',
                            iconCls: 'report',
                            text: 'Support Tickets',
                            menu: {
                                xtype: 'menu',
                                items: [
                                    {
                                        xtype: 'menuitem',
                                        iconCls: 'report_add',
                                        text: 'Neues Ticket anlegen',
                                        listeners: {
                                            click: {
                                                fn: me.pressNewTicket,
                                                scope: me
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'menuitem',
                                        iconCls: 'report',
                                        text: 'Support Tickets',
                                        listeners: {
                                            click: {
                                                fn: me.pressSupportTicket,
                                                scope: me
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'menuitem',
                                        text: 'Ticket Historie',
                                        iconCls: 'report_red',
                                        listeners: {
                                            click: {
                                                fn: me.pressTicketHistory,
                                                scope: me
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'menuitem',
                                        text: 'Projektstatus',
                                        iconCls: 'flag_green',
                                        listeners: {
                                            click: {
                                                fn: me.pressProjectStatusOverview,
                                                scope: me
                                            }
                                        }
                                    },{
                                        xtype: 'menuitem',
                                        text: 'Zurückgestellte Tickets',
                                        iconCls: 'arrow_redo',
                                        listeners: {
                                            click: {
                                                fn: me.pressDeferredTickets,
                                                scope: me
                                            }
                                        }
                                    },{
                                        xtype: 'menuitem',
                                        text: 'Statistik',
                                        iconCls: 'chart_pie',
                                        listeners: {
                                            click: {
                                                fn: me.pressTicketStatistic,
                                                scope: me
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'splitbutton',
                            iconCls: 'database_table',
                            text: 'Kunden',
                            menu: {
                                xtype: 'menu',
                                items: [
                                    {
                                        xtype: 'menuitem',
                                        iconCls: 'database_table',
                                        text: 'Kundenübersicht',
                                        listeners: {
                                            click: {
                                                fn: me.pressCustomerOverview,
                                                scope: me
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'menuitem',
                                        iconCls: 'database_add',
                                        text: 'Neuen Kunden anlegen',
                                        listeners: {
                                            click: {
                                                fn: me.pressNewCustomer,
                                                scope: me
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'splitbutton',
                            text: 'Kontaktpersonen',
                            iconCls: 'group',
                            menu: {
                                xtype: 'menu',
                                items: [
                                    {
                                        xtype: 'menuitem',
                                        iconCls: 'group',
                                        text: 'Kontaktpersonen-Übersicht',
                                        listeners: {
                                            click: {
                                                fn: me.pressContactOverview,
                                                scope: me
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'menuitem',
                                        iconCls: 'user_add',
                                        text: 'Neue Kontaktperson anlegen',
                                        listeners: {
                                            click: {
                                                fn: me.pressNewContact,
                                                scope: me
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                                    xtype: 'button',
                                    text: 'Einstellungen',
                                    iconCls: 'settings',
                                    menu: {
	                                xtype: 'menu',
	                                items: [
	                                    {
	                                        xtype: 'menuitem',
	                                        text: 'Passwort &auml;ndern',
	                                        iconCls: 'application_key',
	                                        handler: function() {
	                                         Ext.widget('changePasswordWindow');
	                                        }
	                                    }
	                                ]
                            }
                        },
                        	{
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'user_go',
                            text: 'Abmelden',
                            tooltip: 'Abmelden',
                            listeners: {
                                click: {
                                    fn: me.onLogoutClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            id: 'logoutButton',
                            listeners: {
                                click: {
                                    fn: me.onLogoutClick,
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
    
    ticketPanelCheckChanges: function() {
    	
    },
    
    customerChangesCouchDB: function(json, lengthRev) {	
    },
    
    ticketChangesCouchDB: function(json, lengthRev) {	
    },
    
    actionChangesCouchDB: function(json, lengthRev) {
    },
    
    getDocIDChanges: function(docID) {
    },
    
    couchDBChanges: function()  {
    },

    onNewTicketbuttonClick: function(button, e, options) {
    },
    
    onCurrentTicketsTabActive: function(abstractcomponent, options) {
    },

    onPressSearch: function(field, e, options) {
    },

    onStatusBarPanelAfterRender: function(abstractcomponent, options) {
    },

    pressHomeButton: function(button, e, options) {
    },

    pressNewTicket: function(item, e, options) {
    },

    pressSupportTicket: function(item, e, options) {
    },

    pressTicketHistory: function(item, e, options) {
    },

    pressProjectStatusOverview: function(item, e, options) {
    },
    
    pressDeferredTickets: function(item, e, options) {
    },
    
    pressTicketStatistic: function(item, e, options) {
    },
    
    pressStaffTicketStatistic: function(item, e, options) {
    },
    
    pressCustomerTicketStatistic: function(item, e, options) {
    },

    pressCustomerOverview: function(item, e, options) {
    },

    pressNewCustomer: function(item, e, options) {
    },

    pressContactOverview: function(item, e, options) {
    },

    pressNewContact: function(item, e, options) {
    },

    onLogoutClick: function(button, e, options) {
    },
    
    doCSTTLayout: function() {
    }

});