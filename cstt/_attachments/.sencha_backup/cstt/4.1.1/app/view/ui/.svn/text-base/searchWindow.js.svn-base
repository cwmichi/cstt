
Ext.define('cstt.view.ui.searchWindow', {
    extend: 'Ext.window.Window',

    height: 240,
    width: 500,
    title: 'Suche nach Support-Tickets',
    autoShow: true,
    searchResArr: null,
    searchResArrTemp: null,
    searchResArrCouchDB: null,
    searchOption: null,
    counterIndex: null,
    counterMaxValue: null,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    defaults: {
                        listeners: {
                            scope: this,
                            specialkey: function(field,
                            events){
                                if(events.getKey()==Ext.EventObject.ENTER){
                                    this.onSearchButtonClick();
                                }
                            }
                        }
                    },
                    bodyPadding: 10,
                    dockedItems: [{
	                    xtype: 'label',
	                    padding: 10,
	                    text: 'Bitte geben Sie einen Suchbegriff ein. Mehrere Wörter müssen mit einem Leerzeichen von einander getrennt werden.',
	                    dock: 'top'
	                }],
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'searchValue',
                            name: 'searchValue',
                            fieldLabel: 'Suchbegriff',
                            anchor: '100%'
                        },  {
            xtype: 'radiogroup',
            fieldLabel: 'Suchoptionen',
            itemId: 'searchRadioOptions',
            columns: 1,
            items: [
                {boxLabel: 'Suche nach allen Begriffen', name: 'option', inputValue: 'allwords', checked: true},
                {boxLabel: 'Suche nach einzelnen Begriffen', name: 'option', inputValue: 'sepwords'}
            ]
        }


                       /* {
                            xtype: 'companyComboBox',
                            name: 'companyDocID',
                            itemId: 'companyDocID',
                            allowBlank: true,
                            emptyText: 'Suche nur nach Tickets von Kunde ...',
                            anchor: '100%'
                        }*/
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    ui: 'footer',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'searchButton',
                            text: 'Suchen',
                            listeners: {
                                click: {
                                    fn: me.onSearchButtonClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            itemId: 'closeButton',
                            text: 'Schließen',
                            listeners: {
                                click: {
                                    fn: me.onCloseButtonClick,
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

    onSearchButtonClick: function(button, e, options) {
    },
    
    searchCouchDB: function (searchValue) {
    },
    
    displaySearchResult: function() {
    },
    
    getSearchResult: function() {
    },

	updateProgressDialog: function(box, currIndex, maxValue) {
    },

    onCloseButtonClick: function(button, e, options) {
    }

});