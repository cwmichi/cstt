/*
 * File: app/view/editTicketWindow.js
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

Ext.define('cstt.view.editTicketWindow', {
    extend: 'cstt.view.ui.editTicketWindow',
    alias: 'widget.editTicketWindow',

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },

    onCancelClick: function(button, e, options) {
        this.close();
    },

    onEditClick: function(button, e, options) {
        if (this.down('form').getForm().isValid()) {

            // Wait Message anzeigen	
            Ext.MessageBox.wait('Speichern ...', 'Bitte warten ...');

            Ext.Ajax.request({
                method: 'POST',
                scope: this,
                url: '../../_design/cstt/_update/updateTicketEdit/'+this.couchDBTicketDocID+'?action='+this.actionForRequest,			
                // Die Formular-Eingaben uebergeben
                params: this.down('form').getForm().getValues(),
                success: function(){
                    // Fenster schliessen
                    this.close();

                    // Wait Message verbergen			
                    Ext.MessageBox.hide();

                    // Ticket als Tab - Inhalte aktualisieren
                    Ext.getCmp(this.showOneTicketExtJsID).updateContent();



                },
                failure: function(){				
                    // Wait Message verbergen			
                    Ext.MessageBox.hide();

                    // Zeige Fehler während des Speicherns			
                    boxErrorDuringSaving();			  
                }
            });


        }
        else {		
            // Zeige Warnung - nicht alle Felder ausgefüllt
            boxWarningRequiredFields();	
        }
    },

    addEditTicketForm: function() {
        this.actionForRequest = 'editTicket';
        this.setTitle('Ticket editieren - ' + this.jsonTicket.title.substring(0, 40) + '... Nr.: '+ this.jsonTicket.ticketNumber);

        this.down('form').add({
            xtype: 'contactRequestComboBox',
            value: this.jsonTicket.contact_request
        },{
            xtype: 'ticketTypeComboBox',	
            value: this.jsonTicket.ticket_type				
        },{
            xtype: 'textfield',
            itemId: 'title',
            fieldLabel: 'Kurzbeschreibung',
            value: this.jsonTicket.title,
            width: 400,
            name: 'title'
        });

        // Änderungen anwenden
        this.down('form').doLayout();

        // setSize( Mixed width, Mixed height )
        this.setSize(540,300);
    },

    addDescriptionTicketForm: function() {
        this.actionForRequest = 'editDescription';

        // Titel vom Fenster setzen
        this.setTitle('Beschreibung editieren - ' + this.jsonTicket.title.substring(0, 40) + '... Nr.: '+ this.jsonTicket.ticketNumber);

        // Komponenten dem Formular hinzufuegen	
        this.down('form').add({
            xtype: 'csttHtmlEditor',
            fieldLabel: 'Beschreibung',
            value: this.jsonTicket.description,
            height: 240,
            width: 700,
            name: 'description'
        });

        // Änderungen anwenden
        this.down('form').doLayout();

        // setSize( Mixed width, Mixed height )
        this.setSize(750,340);
    },

    addSolutionToCustomerTicketForm: function() {
        this.actionForRequest = 'editSolution';

        // Titel vom Fenster setzen
        this.setTitle('L&ouml;sungsvorschlag an Kunde editieren - ' + this.jsonTicket.title.substring(0, 40) + '... Nr.: '+ this.jsonTicket.ticketNumber);

        // Komponenten dem Formular hinzufügen	
        this.down('form').add({
            xtype: 'csttHtmlEditor',
            fieldLabel: 'L&ouml;sungsvorschlag an Kunde',
            value: this.jsonTicket.solution,
            height: 240,
            width: 700,
            name: 'solution'
        });


        // Änderungen anwenden
        this.down('form').doLayout();

        // setSize( Mixed width, Mixed height )
        this.setSize(750,340);
    }

});