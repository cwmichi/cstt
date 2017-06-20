/*
 * File: app/view/ui/createCustomerWindow.js
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

Ext.define('cstt.view.ui.createCustomerWindow', {
    extend: 'Ext.window.Window',

    autoShow: true,
    height: 350,
    width: 700,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'database_add',
    title: 'Neuen Kunden anlegen ...',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
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
                            xtype: 'button',
                            hidden: true,
                            itemId: 'edit',
                            text: 'Änderungen speichern',
                            listeners: {
                                click: {
                                    fn: me.onEditClick,
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
                    xtype: 'form',
                    height: 290,
                    itemId: 'customerForm',
                    border: false,
                    // damit originalValue gesetzt wird
                    trackResetOnLoad: true,
                    defaults: {
                        labelWidth: 160
                    },
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'CompanyTextfield',
                            name: 'company',
                            fieldLabel: 'Name des Kunden *',
                            allowBlank: false,
                            vtype: 'uniqueName',
                            validateOnChange: false,
                            uniqueURL: '_view/uniqueCustomer',
                            anchor: '95%'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'pilotCheckbox',
                            name: 'pilot',
                            fieldLabel: 'Pilotkunde',
                            boxLabel: 'Haken aktivieren',
                            inputValue: 'true',
                           	listeners: {
                       			click: {
                    	            element: 'el',
                    				scope: this,
                    	            fn: function(){ 
                    				 	var checkbox = this.down('#pilotCheckbox');
                    					var checkboxValue = checkbox.getValue();
                    					
                    					if (checkboxValue == true) {									
                    						this.down('#addOnsProduct').allowBlank = true;
                    						this.down('#editionProduct').allowBlank = true;
                    						this.down('#numberOfLicences').allowBlank = true;
                    						this.down('#supportTo').allowBlank = true;
                    						this.down('form').doLayout();					
                    					} else {
                    						this.down('#addOnsProduct').allowBlank = false;
                    						this.down('#editionProduct').allowBlank = false;
                    						this.down('#numberOfLicences').allowBlank = false;
                    						this.down('#supportTo').allowBlank = false;
                    						this.down('form').doLayout();	
                    					}
                    					
                    				}
                            }
                    		},
                            uncheckedValue: 'false',
                            anchor: '100%'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'resellerCheckbox',
                            name: 'reseller',
                            fieldLabel: 'Reseller',
                            boxLabel: 'Kunde ist ein Reseller',
                            inputValue: true,
                           	listeners: {
                       			change: {
                    				scope: this,
                    	            fn: function(field, newValue, oldValue, options){
                    					
                    					if(newValue === true) {
                    						this.down('#pilotCheckbox').disable();
                    						this.down('#panel_product').disable();
                    						this.down('#panel_vtiger').disable();
                    						this.down('#panel_reseller').disable();
                    					} else {
                    						this.down('#pilotCheckbox').enable();
                    						this.down('#panel_product').enable();
                    						this.down('#panel_vtiger').enable();
                    						this.down('#panel_reseller').enable();
                    					}
                    					
                    				}
                            }
                    		},
                            uncheckedValue: false,
                            anchor: '100%'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'type',
                            value: 'customer',
                            fieldLabel: 'Label',
                            anchor: '100%'
                        },
                        {
                            xtype: 'tabpanel',
                            height: 170,
                            activeItem: 0,
                            bodyPadding: '',
                            activeTab: 0,
                            deferredRender: false,
                            plain: true,
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'column'
                                    },
                                    bodyPadding: 10,
                                    title: 'Angaben zum Kunden',
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'leftContainer',
                                            padding: 10,
                                            width: 300,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    name: 'street1',
                                                    fieldLabel: 'Adresszeile 1'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    name: 'street2',
                                                    fieldLabel: 'Adresszeile 2'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    name: 'street3',
                                                    fieldLabel: 'Adresszeile 3'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            itemId: 'rightContainer',
                                            padding: 10,
                                            width: 300,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    width: 200,
                                                    name: 'zip_code',
                                                    fieldLabel: 'PLZ',
                                                    maxLength: 5,
                                                    maxLengthText: 'Postleitzahl darf nur aus 5 Zeichen bestehen.'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    name: 'city',
                                                    fieldLabel: 'Ort'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    name: 'country',
                                                    value: 'Deutschland',
                                                    fieldLabel: 'Land *',
                                                    allowBlank: false,
                                                    emptyText: 'Land auswählen ...',
                                                    selectOnFocus: true,
                                                    displayField: 'name',
                                                    queryMode: 'local',
                                                    store: 'countryStore',
                                                    typeAhead: true,
                                                    valueField: 'name'
                                                },
                                                {
                                                    xtype: 'hiddenfield',
                                                    itemId: 'creator_ID',
                                                    name: 'creator_ID',
                                                    fieldLabel: 'Label'
                                                },
                                                {
                                                    xtype: 'hiddenfield',
                                                    itemId: 'editor_ID',
                                                    name: 'editor_ID',
                                                    fieldLabel: 'Label'
                                                }
                                                ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'column'
                                    },
                                    bodyPadding: 10,
                                    itemId: 'panel_product',
                                    title: 'Angaben zum Produkt',
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'leftContainer',
                                            padding: 10,
                                            width: 300,
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'editionProduct',
                                                    name: 'editionProduct',
                                                    fieldLabel: 'Edition *',
                                                    labelWidth: 130,
                                                    allowBlank: false,
                                                    emptyText: 'Edition auswählen ...',
                                                    selectOnFocus: true,
                                                    displayField: 'editionType',
                                                    queryMode: 'local',
                                                    store: 'editionProductStore',
                                                    typeAhead: true,
                                                    valueField: 'editionType'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'addOnsProduct',
                                                    name: 'addOnsProduct',
                                                    fieldLabel: 'Add Ons',
                                                    labelWidth: 130,
                                                    allowBlank: false,
                                                    emptyText: 'Add Ons auswählen ...',
                                                    selectOnFocus: true,
                                                    displayField: 'addOnsType',
                                                    queryMode: 'local',
                                                    store: 'addOnsStore',
                                                    typeAhead: true,
                                                    valueField: 'addOnsType'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    itemId: 'numberOfLicences',
                                                    name: 'numberOfLicences',
                                                    fieldLabel: 'Anzahl der Lizenzen *',
                                                    labelWidth: 130,
                                                    allowBlank: false,
                                                    allowDecimals: false,
                                                    minValue: 0,
                                                    negativeText: 'Ein Wert kleiner als 0 ist nicht zulässig!'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            itemId: 'rightContainer',
                                            padding: 10,
                                            width: 300,
                                            items: [
                                                {
                                                    xtype: 'datefield',
                                                    name: 'supportFrom',
                                                    itemId: 'supportFrom',
                                                    fieldLabel: 'Support von',
                                                    altFormats: 'd-m-Y',
                                                    format: 'Y-m-d'
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    itemId: 'supportTo',
                                                    name: 'supportTo',
                                                    fieldLabel: 'Support bis *',
                                                    allowBlank: false,
                                                    altFormats: 'd-m-Y',
                                                    format: 'Y-m-d'
                                                },{
						                            xtype: 'checkboxfield',
						                            itemId: 'supportCancel',
						                            name: 'supportCancel',
						                            fieldLabel: 'Support gek&uuml;ndigt',
						                            boxLabel: 'Haken aktivieren',
						                            inputValue: true,
						                            uncheckedValue: false,
						                            listeners: {
						                       			change: {
						                    				scope: this,
						                    	            fn: function(field, newValue, oldValue, options) { 
						                    					
						                    					if (newValue === true) {									
						                    						this.down('#supportTo').disable();
						                    						this.down('#supportFrom').disable();	
						                    					} else {
						                    						this.down('#supportTo').enable();
						                    						this.down('#supportFrom').enable();
						                    					}
						                    					
						                    				}
						                            }
						                    		},
						                            anchor: '100%'
						                        },
                                                {
                                                    xtype: 'textfield',
                                                    name: 'specials',
                                                    fieldLabel: 'Besonderheiten'
                                                }
                                            ]
                                        }
                                    ]
                                },{
                                    xtype: 'panel',
                                    layout: {
                                        type: 'column'
                                    },
                                    bodyPadding: 10,
                                    itemId: 'panel_vtiger',
                                    title: 'VTiger Sync',
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'leftContainer',
                                            padding: 10,
                                            width: 300,
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    itemId: 'accountid',
                                                    name: 'accountid',
                                                    minValue: 0, //prevents negative numbers
                                                    value: 0,
													hideTrigger: true,
											        keyNavEnabled: false,
											        mouseWheelEnabled: false,
                                                    fieldLabel: 'VTiger ID',
                                                    vtype: 'uniqueName',
                                                    validateOnChange: false,
                            						uniqueURL: '_view/uniqueVtiger'
                                                   
                                                }                                               
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            itemId: 'rightContainer',
                                            padding: 10,
                                            width: 300                                           
                                        }
                                    ]
                                },{
                                    xtype: 'panel',
                                    layout: {
                                        type: 'column'
                                    },
                                    bodyPadding: 10,
                                    itemId: 'panel_reseller',
                                    title: 'Reseller',
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'leftContainer',
                                            padding: 10,
                                            width: 300,
                                            items: [
	                                            {
	                                            	xtype: 'resellerCombo',
	                                            	biTooltipText: 'Bitte ausw&auml;hlen, wenn der Kunde zu einem Reseller geh&ouml;rt!',
	                                            	listeners: {
	                                            		expand: {
	                                            			scope: this,
	                                            			fn: function(field, options) {
	                                            				field.getStore().load();
	                                            			}
	                                            		}
	                                            	}
	                                            }                                                 
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            itemId: 'rightContainer',
                                            padding: 10,
                                            width: 300                                           
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'displayfield',
                            fieldStyle: 'font-weight: bold;',
                            submitValue: false,
                            value: '* Pflichtfelder'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onSaveClick: function(button, e, options) {
    },

    onEditClick: function(button, e, options) {
    },

    onCancelClick: function(button, e, options) {
    }

});