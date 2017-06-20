/*
 * File: app/view/showOneTicket.js
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

Ext.define('cstt.view.showOneTicket', {
    extend: 'cstt.view.ui.showOneTicket',
    alias: 'widget.showOneTicket',

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },

    actionHandleComment: function(item, e, options) {
        // Aktion: Kommentar
        var window = Ext.widget('actionWindow');
        window.couchDBTicketDocID = this.dataRecord.get('_id');
        window.showOneTicketExtJsID = this.getId();
        var action = 'progressComment';

        var title = this.dataRecord.get('title');
        if (title.length > 24) {		
            title = title.substring(0, 24) + '...';
        }				

        window.setTitle('Ticket: '+title+' - Aktion ausf&uuml;hren');
        window.down('#action').setValue(action);
        window.down('#actionLabel').setValue('Kommentar');	
        window.down('#ticket_ID').setValue(this.dataRecord.get('_id'));
    },

    actionEscalation2ndLevel: function(item, e, options) {
        // Aktion: Eskalation 2nd Level
        var window = Ext.widget('actionWindow');
        window.couchDBTicketDocID = this.dataRecord.get('_id');
        window.showOneTicketExtJsID = this.getId();
        var action = 'progressEscalation';

        var title = this.dataRecord.get('title');
        if (title.length > 24) {		
            title = title.substring(0, 24) + '...';
        }				

        window.setTitle('Ticket: '+title+' - Aktion ausf&uuml;hren');
        window.down('#action').setValue(action);
        window.down('#actionLabel').setValue('Eskalation (2nd Level)');
        window.down('#status').setValue(6);
        window.down('#ticket_ID').setValue(this.dataRecord.get('_id'));
    },

    actionEscalationSales: function(item, e, options) {
        // Aktion: Eskalation Vertrieb
        var window = Ext.widget('actionWindow');
        window.couchDBTicketDocID = this.dataRecord.get('_id');
        window.showOneTicketExtJsID = this.getId();
        var action = 'progressEscalationSales';

        var title = this.dataRecord.get('title');
        if (title.length > 24) {		
            title = title.substring(0, 24) + '...';
        }				

        window.setTitle('Ticket: '+title+' - Aktion ausf&uuml;hren');
        window.down('#action').setValue(action);
        window.down('#actionLabel').setValue('Eskalation (Vertrieb)');
        window.down('#status').setValue(7);		
        window.down('#ticket_ID').setValue(this.dataRecord.get('_id'));
    },

    actionHandleSupport: function(item, e, options) {
        // Aktion: In Bearbeitung Support
        var window = Ext.widget('actionWindow');
        window.couchDBTicketDocID = this.dataRecord.get('_id');
        window.showOneTicketExtJsID = this.getId();
        var action = 'progressSupport';

        var title = this.dataRecord.get('title');
        if (title.length > 24) {		
            title = title.substring(0, 24) + '...';
        }				

        window.setTitle('Ticket: '+title+' - Aktion ausf&uuml;hren');
        window.down('#action').setValue(action);
        window.down('#actionLabel').setValue('In Bearbeitung (Support)');
        window.down('#status').setValue(2);
        window.down('#ticket_ID').setValue(this.dataRecord.get('_id'));
    },

    actionHandleCustomer: function(item, e, options) {
        // Aktion: In Bearbeitung Kunde
        var window = Ext.widget('actionWindow');
        window.couchDBTicketDocID = this.dataRecord.get('_id');
        window.showOneTicketExtJsID = this.getId();
        var action = 'progressCustomer';

        var title = this.dataRecord.get('title');
        if (title.length > 24) {		
            title = title.substring(0, 24) + '...';
        }				

        window.setTitle('Ticket: '+title+' - Aktion ausf&uuml;hren');
        window.down('#action').setValue(action);
        window.down('#actionLabel').setValue('In Bearbeitung (Kunde)');
        window.down('#status').setValue(3);
        window.down('#ticket_ID').setValue(this.dataRecord.get('_id'));

        window.down('#fieldsetCustomerFiles').show();
        window.down('#fieldsetCustomerFiles').add({
            xtype: 'fieldset',			
            title: 'Geforderte Dateien',
            autoHeight: true,
            defaultType: 'checkbox', // jedes Item ist eine Checkbox
            items: [{
                boxLabel: 'Infoserver.zip',
                inputValue: 'Infoserver.zip',
                hideLabel: true,
                name: 'reqFiles'
            }, {
                boxLabel: 'Infoserver.ini',
                inputValue: 'Infoserver.ini',
                hideLabel: true,
                name: 'reqFiles'
            }, {
                boxLabel: 'InfoserverDebug',
                inputValue: 'InfoserverDebug.log',
                hideLabel: true,
                name: 'reqFiles'
            }, {
                boxLabel: 'InfoserverReport',
                inputValue: 'InfoserverReport.log',
                hideLabel: true,
                name: 'reqFiles'
            }, {
                boxLabel: 'Infoclient.ini',
                inputValue: 'Infoclient.ini',
                hideLabel: true,
                name: 'reqFiles'
            }, {
                boxLabel: 'InfoclientDebug',
                inputValue: 'InfoclientDebug.log',
                hideLabel: true,
                name: 'reqFiles'
            }, {
                boxLabel: 'InfoclientReport',
                inputValue: 'InfoclientReport.log',
                hideLabel: true,
                name: 'reqFiles'
            }, {
                boxLabel: 'Database',
                inputValue: 'Database',
                hideLabel: true,
                name: 'reqFiles'
            }, {
                boxLabel: 'Screenshots',
                inputValue: 'Screenshots',
                hideLabel: true,
                name: 'reqFiles'
            }, 
            {
                boxLabel: 'AKM.zip',
                inputValue: 'AKM.zip',
                hideLabel: true,
                name: 'reqFiles'
            }, {
                boxLabel: 'Sonstige',
                inputValue: 'Other',
                hideLabel: true,
                name: 'reqFiles'
            }]
        });

        window.down('#fieldsetCustomerFiles').doLayout();
    },

    actionSolutionToCustomer: function(item, e, options) {
        // Aktion: Loesungsvorschlag an Kunde
        var window = Ext.widget('actionWindow');
        window.couchDBTicketDocID = this.dataRecord.get('_id');
        window.showOneTicketExtJsID = this.getId();
        var action = 'progressSolution';

        var title = this.dataRecord.get('title');
        if (title.length > 24) {		
            title = title.substring(0, 24) + '...';
        }				

        window.setTitle('Ticket: '+title+' - Aktion ausf&uuml;hren');
        window.down('#action').setValue(action);
        window.down('#actionLabel').setValue('L&ouml;sungsvorschlag an Kunde');
        window.down('#status').setValue(5);
        window.down('#ticket_ID').setValue(this.dataRecord.get('_id'));
        window.down('#comment').setValue(this.jsonTicket.solution);
    },

    actionHandleDevelopment: function(item, e, options) {
        // Aktion: Weitergabe an Entwicklung (Derbystrasse)
        var window = Ext.widget('actionWindow');
        window.couchDBTicketDocID = this.dataRecord.get('_id');
        window.showOneTicketExtJsID = this.getId();
        var action = 'progressDevelopment';

        var title = this.dataRecord.get('title');
        if (title.length > 24) {		
            title = title.substring(0, 24) + '...';
        }				

        window.setTitle('Ticket: '+title+' - Aktion ausf&uuml;hren');
        window.down('#action').setValue(action);
        window.down('#actionLabel').setValue('Weitergabe an Entwicklung (Derbystrasse)');
        window.down('#status').setValue(4);
        window.down('#ticket_ID').setValue(this.dataRecord.get('_id'));
    },
     actionHandleDevelopmentOffice: function(item, e, options) {
        // Aktion: Weitergabe an Entwicklung (Hauptplatz)
        var window = Ext.widget('actionWindow');
        window.couchDBTicketDocID = this.dataRecord.get('_id');
        window.showOneTicketExtJsID = this.getId();
        var action = 'progressDevelopmentOffice';

        var title = this.dataRecord.get('title');
        if (title.length > 24) {		
            title = title.substring(0, 24) + '...';
        }				

        window.setTitle('Ticket: '+title+' - Aktion ausf&uuml;hren');
        window.down('#action').setValue(action);
        window.down('#actionLabel').setValue('Weitergabe an Entwicklung (Hauptplatz)');
        window.down('#status').setValue(9);
        window.down('#ticket_ID').setValue(this.dataRecord.get('_id'));
    },
    
    actionHandleDeferredTicket: function(item, e, options) {
        // Nur Admin-Rolle darf das Ticket zurückstellen
        if (isAdmin === true) {		

            if (parseInt(this.jsonTicket.status) !== 8)	{	

                    var window = Ext.widget('actionWindow');
                    window.couchDBTicketDocID = this.dataRecord.get('_id');
                    window.showOneTicketExtJsID = this.getId();
                    var action = 'progressDeferred';

                    var title = this.dataRecord.get('title');
                    if (title.length > 24) {		
                        title = title.substring(0, 24) + '...';
                    }				

                    window.setTitle('Ticket: '+title+' - Aktion ausf&uuml;hren');
                    window.down('#action').setValue(action);
                    window.down('#actionLabel').setValue('Ticket zur&uuml;ckstellen');
                    window.down('#status').setValue(8);
                    window.down('#ticket_ID').setValue(this.dataRecord.get('_id'));


            } else {
                Ext.MessageBox.show({
                    title: 'Hinweis',
                    msg: 'Das Ticket wurde bereits zur&uuml;ckgestellt!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
        }
        else { boxErrorAccessDenied(); }
    },

    actionHandleCloseTicket: function(item, e, options) {
        // Nur Admin-Rolle darf das Ticket schließen
        if (isAdmin === true) {		

            if (parseInt(this.jsonTicket.status) !== 0)	{	

                if (this.dataRecord.get('ticket_type') !== "Projektstatus") {			

                    var window = Ext.widget('actionWindow');
                    window.couchDBTicketDocID = this.dataRecord.get('_id');
                    window.showOneTicketExtJsID = this.getId();
                    var action = 'closeTicket';

                    var title = this.dataRecord.get('title');
                    if (title.length > 24) {		
                        title = title.substring(0, 24) + '...';
                    }				

                    window.setTitle('Ticket: '+title+' - Aktion ausf&uuml;hren');
                    window.down('#action').setValue(action);
                    window.down('#actionLabel').setValue('Ticket schlie&szlig;en');
                    window.down('#status').setValue(0);
                    window.down('#ticket_ID').setValue(this.dataRecord.get('_id'));

                } else  {
                    Ext.MessageBox.show({
                        title: 'Hinweis',
                        msg: 'Ein Projekstatus kann nicht geschlossen werden!',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                }

            } else {
                Ext.MessageBox.show({
                    title: 'Hinweis',
                    msg: 'Das Ticket wurde bereits geschlossen!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
        }
        else { boxErrorAccessDenied(); }
    },

    DisplayEditTicketWindow: function(button, e, options) {
        // Hole aktiven Tab
        if (isAdmin === true || isTCOB === true || this.jsonTicket.owner === sessionUserID) {

            var activeTab = this.getComponent('tabpanelUp').getActiveTab().itemId;

            // Erzeuge Fenster zum Ticket editieren
            var window = Ext.widget('editTicketWindow');
            window.couchDBTicketDocID = this.dataRecord.get('_id');
            window.showOneTicketExtJsID = this.getId();
            window.jsonTicket = this.jsonTicket;

            switch (activeTab) {
                // Ticket aendern
                case 'ticketPanel':
                window.addEditTicketForm();
                break;

                // Beschreibung aendern
                case 'description':
                window.addDescriptionTicketForm();
                break;

                // Qualifizierte Loesung aendern
                case 'panelApproach':
                window.addSolutionToCustomerTicketForm();
                break;
            }


            window.show();
        } else {
            // Zugriff verweigert
            boxErrorAccessDenied();
        }
    },

    updateContent: function() {
        var ticketPanel = this;
        // Ext.MessageBox.progress('Laden ...', 'Ticket wird geladen ...');
        // Datum/Zeit setzen:
        var date = this.dataRecord.get('date');
        date =  new Date(date);
        date = Ext.util.Format.date(date,'d.m.Y H:i:s'); 
        ticketPanel.down('#date').setValue(date);
        
        
        // Firma setzen
           Ext.Ajax.request({
            method: 'GET',
            url: '../../'+this.dataRecord.get('customerDocID'),
            // Header auf application/json setzen - CouchDB
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            scope: this,
            success: function (result, request ) {
                var json = Ext.JSON.decode(result.responseText);
                
                // Firma setzen
				ticketPanel.down('#companyName').setValue(json.company);
				
				var companyToolTip = "";
				
				companyToolTip = '<b>Lizenzen:</b> '+json.numberOfLicences+'<br/>';
				companyToolTip = companyToolTip + '<b>Edition:</b> '+json.editionProduct+'<br/>';
				
				 // Support bis
                    if (!Ext.isEmpty(json.supportTo)) {
                        var supportDateTo = Ext.Date.parse(json.supportTo,'Y-m-d');     
                        var supportDateToDMY = Ext.Date.format(supportDateTo, 'd.m.Y'); 
                        companyToolTip = companyToolTip + '<b>Support bis:</b> '+supportDateToDMY+'<br/>';
                    }
                    
	
	        				
				
                 if (json.pilot !== undefined) {
	                 if (json.pilot === 'true' || json.pilot === true) {	
	              	 		// Firma setzen
	        				ticketPanel.down('#companyName').setValue(json.company+' (Pilotkunde)');
	        				companyToolTip = json.company + ' ist ein Pilotkunde!';
	                 	} 
                 } 
                 
                 
                 Ext.QuickTips.init();
                
			    
			    var tip = Ext.create('Ext.tip.ToolTip', {
				    target: ticketPanel.down('#companyName').getEl(),
				    trackMouse: true,
				    // Render immediately so that tip.body can be referenced prior to the first show.
				    renderTo: Ext.getBody(),
				    width: 160,
				    listeners: {
				        // Change content dynamically depending on which element triggered the show.
				        beforeshow: function(tip) {
				            tip.update(companyToolTip);
				        }
				    }
				});
    
                  
            	}
            });

      

        
        
        // Ersteller des Tickets setzen
        ticketPanel.down('#creatorNameTicket').setValue(this.dataRecord.get('ownerConvert'));

        Ext.Ajax.request({
            method: 'GET',
            url: '../../'+this.dataRecord.get('_id'),
            // Header auf application/json setzen - CouchDB
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            scope: this,
            success: function (result, request ) {
                var json = Ext.JSON.decode(result.responseText);

                this.jsonTicket = json;
                // Kontaktaufnahme setzen
                
                if (json.contact_request !== undefined) {
                    ticketPanel.down('#contact_request').setValue(json.contact_request);
                } else {ticketPanel.down('#contact_request').hide();}
                    // Kurzbeschreibung setzen
                    ticketPanel.down('#title').setValue(json.title);
                    // Ticket Nummer setzen
                    ticketPanel.down('#ticketNumber').setValue(json.ticketNumber);
                    // Ticket Typ setzen
                    ticketPanel.down('#ticket_type').setValue(json.ticket_type);
                    // Ticket Produkt setzen
                    ticketPanel.down('#product').setValue(renderer_product(json.product));
                    // Status setzen
                    var statusText = renderer_status (parseInt(json.status), [], json.lastEditorID);
                    ticketPanel.down('#status').setValue(statusText);
                    // Beschreibung setzen
                    ticketPanel.down('#description').update(json.description);
                    // Loesungsvorschlag an Kunde setzen
                    ticketPanel.down('#panelApproach').update(json.solution);
                    // Qualifizierte Loesung setzen
                    ticketPanel.down('#qualifiedSolution').update(json.qualifiedSolution);







                }
            });








            // Kontaktperson setzen
            if (!this.dataRecord.get('contactDocID' == null)) {	
                Ext.Ajax.request({
                    method: 'GET',
                    url: '../../'+this.dataRecord.get('contactDocID'),
                    // Header auf application/json setzen - CouchDB
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    scope: this,
                    success: function (result, request ) {
                        var json = Ext.JSON.decode(result.responseText);
                        var label = ticketPanel.down('#contactName');
                        if (!json.forename == '') {
                            label.setValue('<a href="mailto:'+json.email+'?subject=AW:%20Ticket%20%23'+this.dataRecord.get('ticketNumber')+'">'+ json.surname+', '+json.forename+'</a> -  Tel.: '+json.phone);
                        } else {
                            label.setValue('<a href="mailto:'+json.email+'?subject=AW:%20Ticket%20%23'+this.dataRecord.get('ticketNumber')+'">'+ json.surname+'</a> -  Tel.: '+json.phone);
                        }		
                    },
                    failure: function() {
                    	ticketPanel.down('#contactName').setValue(this.dataRecord.get('contactDocID'));
                    }
                });
            }




            // Aktionen zum Ticket
            ticketPanel.down('#oneTicketActionGrid').couchDBDocID = this.couchDBDocID;
            ticketPanel.down('#oneTicketActionGrid').getStore().load({
                params: {
                    "key": '"'+this.dataRecord.get('_id')+'"'
                }
            });
            
            ticketPanel.down('#oneTicketActionGrid').getView().refresh();

            // Dateianhaenge zum Ticket
            ticketPanel.down('#attachmentsToTicketGrid').couchDBDocID = this.couchDBDocID;
            ticketPanel.down('#attachmentsToTicketGrid').getStore().load({
                params: {
                    "key": '"'+this.dataRecord.get('_id')+'"'
                }
            });
            
            ticketPanel.down('#attachmentsToTicketGrid').getView().refresh();
            
            // Remotesitzungen zum Ticket
            ticketPanel.down('#remotesessionFilesGrid').couchDBDocID = this.couchDBDocID;
            ticketPanel.down('#remotesessionFilesGrid').couch_tvs = true;
            ticketPanel.down('#remotesessionFilesGrid').getStore().load({
                params: {
                    "key": '"'+this.dataRecord.get('_id')+'"'
                }
            });
            
            

		// Kommentare zum Ticket
var commentStore = new Ext.data.Store({
model: 'cstt.model.commentModel',
			 sorters: [
{
    property : 'createdOn',
direction: 'DESC'
    }
]	
			});


            commentStore.load({
                params: {
                    "key": '"'+this.dataRecord.get('_id')+'"'
                },
                callback: function(){

                    var count = commentStore.count();
                    // Store muss einen Inhalt haben
                    if (count > 0){
                        // Panel-ItemID des Kommentar-Tab
                        var tabItemId = 'panelComment';

                        // hole aus dem TabPanel die eingegebene ID.
                        var tab =  ticketPanel.getComponent('tabpanelBottom').getComponent(tabItemId);

                        // Prüfung ob die Variable mit der ID passt
                        if (!tab) {
                            ticketPanel.getComponent('tabpanelBottom').add({
                                title: 'Kommentare',
                                itemId: tabItemId,
                                couchDBDocID: ticketPanel.dataRecord.get('_id'),
                                iconCls: 'comments',
                                layout: {
			                    	type: 'fit'
			                    },
                                items: {
                                    xtype: 'actionCommentGrid',
                                    //height: 250,
                                    autoScroll: true,
                                    overflow: 'auto',
                                    itemId: 'actionCommentGrid',
                                    couchDBDocID: ticketPanel.dataRecord.get('_id'),
                                    store: commentStore,
                                    title: 'Kommentare'
                                }
                                //items: CommentToOneTicketGrid				
                            });

                            // Hinzufügen des Tab beim TicketPanel aktualisieren
                            ticketPanel.getComponent('tabpanelBottom').doLayout();	
                        } else
                        	{
                        		
                        		ticketPanel.getComponent('tabpanelBottom').down('#actionCommentGrid').onRefreshClick();
                        	
                        	}		


                    }
                }
            })



           

            ticketPanel.doLayout();
    },

    onTicketPanelActivate: function(abstractcomponent, options) {
        this.down('#buttonEditTicket').enable();
    },

    onDescriptionActivate: function(abstractcomponent, options) {
        this.down('#buttonEditTicket').enable();
    },

    confirmQualifiedSolution: function(button, e, options) {
        if (isAdmin === true) {

        	
        	function actionConfirm(btn){
                if (btn == 'yes') {									
                    Ext.Ajax.request({
                        method: 'POST',
                        scope: this,
                        url: '../../_design/cstt/_update/updateTicketAction/'+this.couchDBDocID+'?action=qualifiedSolution',			
                        success: function(){
                            this.updateContent();												
                        },
                        failure: function(){
                            // Zeige Fehler waehrend des Speicherns			
                            boxErrorDuringSaving();	
                        }
                    });
                }
            }	
            
            
            Ext.Msg.show({
                title:'Best&auml;tigung',
                msg: 'M&ouml;chten Sie den L&ouml;sungsvorschlag an Kunde als Qualifizierte L&ouml;sung &uuml;bernehmen?',
                buttons: Ext.Msg.YESNO,
                fn: actionConfirm,
                icon: Ext.MessageBox.WARNING,
                scope: this
            });

            


        } else { boxErrorAccessDenied(); }
    },

    onPanelApproachActivate: function(abstractcomponent, options) {
        this.down('#buttonEditTicket').enable();
    },

    onQualifiedSolutionActivate: function(abstractcomponent, options) {
        this.down('#buttonEditTicket').disable();
    }

});