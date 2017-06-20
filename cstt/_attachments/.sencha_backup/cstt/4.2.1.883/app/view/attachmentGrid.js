/*
 * File: app/view/attachmentGrid.js
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

Ext.define('cstt.view.attachmentGrid', {
    extend: 'cstt.view.ui.attachmentGrid',
    alias: 'widget.attachmentGrid',

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },

    onRefreshClick: function(button, e, options) {
        this.store.load({
				params: {
					"key": '"'+this.couchDBDocID+'"'
				}
			});
    },

    onUploadClick: function(button, e, options) {
        var uploadWindow =  Ext.widget('uploadWindow');
        uploadWindow.couchDBDocID = this.couchDBDocID;
        uploadWindow.ExtJSattachmentGridID = this.getId();
        uploadWindow.show();
    },

    onDeleteClick: function(button, e, options) {
    	
    	// selectFile ist der Data Record!
        selectFile = this.getView().getSelectionModel().getSelection()[0];

        if (selectFile) {	
        	
        	if(isAdmin==true||isTCOB==true) {
        	
        	 var deleteFileWindow = Ext.widget('deleteFileForm');
        	 deleteFileWindow.ExtJSattachmentGridID = this.getId();
        	 deleteFileWindow.down('#filename').setValue(selectFile.get('filename'));
        	 deleteFileWindow.down('#ticketDocID').setValue(selectFile.get('_id'));
        	 deleteFileWindow.down('#filenameHidden').setValue(selectFile.get('filename'));
        	
        	} else {
        	 Ext.MessageBox.show({
                    title: 'L&ouml;schen nicht m&ouml;glich',
                    msg: 'Nur Administratoren k&ouml;nnen Dateien l&ouml;schen!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });	
        	
        	
        	}
             } else {
        
         Ext.MessageBox.show({
                title: 'Hinweis',
                msg: 'Bitte w&auml;hlen Sie zuerst eine Datei aus, die Sie l&ouml;schen m&ouml;chten.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        
        }
       
    }

});