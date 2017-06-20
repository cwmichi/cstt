/*
 * File: app/view/createContactWindow.js
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

Ext.define('cstt.view.createContactWindow', {
    extend: 'cstt.view.ui.createContactWindow',
    alias: 'widget.createContactWindow',

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },

    onSaveClick: function(button, e, options) {
        // Formularüberprüfung
        if (this.down('form').getForm().isValid()) {
            
            this.down('#creator_ID').setValue(sessionUserID);

            // Wait Message anzeigen	
            Ext.MessageBox.wait('Speichern ...', 'Bitte warten ...');

            Ext.Ajax.request({
                method: 'POST',
                url: '../../',
                scope: this,
                // Header auf application/json setzen - CouchDB
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                // Die Formular-Eingaben uebergeben
                params: Ext.JSON.encode(this.down('form').getForm().getValues()),
                success: function(){
                    // Fenster schliessen
                    this.close();

                    // Wait Message verbergen			
                    Ext.MessageBox.hide();


                    if(Ext.getCmp('viewport').getComponent('centerTabPanel').getComponent('contactsGridTab')) {
                        Ext.data.StoreManager.lookup('contactGridStore').load();

                    }	
                    
                    // Wurde eine Kontaktperson über die Kundenübersicht Anzeige + Kontaktpersonen anzeigen aufgerufen, dann diesen Store auch neuladen.
                    if (this.contactGridExtJSID != 'null') {
                    	Ext.getCmp(this.contactGridExtJSID).onRefreshClick();                    	
                    }



                    /*
                    // Wenn der Tab der Versionsverwaltung offen ist, den Store hierfür neu laden
                    if(TabPanel.getItem('overviewVersionGrid')){
                        versionOverviewStore.reload();
                    }

                    */


                },
                failure: function(){
                    // Wait Message verbergen			
                    Ext.MessageBox.hide();

                    // Zeige Fehler waehrend des Speicherns			
                    boxErrorDuringSaving();			  
                }
            });
        }
        else {		
            // Zeige Warnung - nicht alle Felder ausgefüllt
            boxWarningRequiredFields();	
        }
    },

    onEditClick: function(button, e, options) {
        if (this.down('form').getForm().isValid()) {			
        this.down('#editor_ID').setValue(sessionUserID);

            //	var record = this.down('form').getRecord();
            //	var values = this.down('form').getValues();
            //	record.set(values);		
            //	record.commit();


            var record = this.down('form').getRecord();		

            //console.log(record);

            this.down('form').getForm().updateRecord(record);		 


            Ext.getCmp(this.contactGridExtJSID).getStore().sync();
            Ext.getCmp(this.contactGridExtJSID).getStore().removeAll();

            this.close();

            Ext.MessageBox.show({
                title: 'Status',
                msg: '&Auml;nderungen wurden gespeichert.',
                buttons: Ext.MessageBox.OK,
                scope: this,
                fn: function() {
                    Ext.example.msg('Status', 'Synchronisierung');	
                    Ext.getCmp(this.contactGridExtJSID).onRefreshClick();
                }	
            });
        }
        else {
            // Zeige Warnung - nicht alle Felder ausgefuellt
            boxWarningRequiredFields();
        }
    },

    onCancelClick: function(button, e, options) {
        this.close();
    }

});