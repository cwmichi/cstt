Ext.define('cstt.controller.tickets', {
    extend: 'Ext.app.Controller',
    
    views: [
    	'allTicketsGrid',
    	'actionCommentGrid'
    ],
    
    init: function() {
        this.control({
            "allTicketsGrid": {
                itemdblclick: this.showOneTicketasNewTab
            },
            "allTicketsGrid > toolbar > button[itemId=openTicket]": {
                click: this.openTicketFromToolbar
            },
            "#currentTicketsGrid": {
            	itemclick: this.onCurrentTicketsGridClick
            },
            "actionCommentGrid": {
                itemdblclick: this.showOneActionInWindow
            },
             "actionCommentGrid > toolbar > button[itemId=openAction]": {
                click: this.openActionFromToolbar
            },
            "kbArticleGrid": {
                itemdblclick: this.showOneKBArticle
            }
        });
    },
    
    showOneTicketasNewTab: function(tablepanel, record, item, index, e, options) {
		
	/*	var messageBoxLoadTicket = Ext.MessageBox.show({
           title: 'Laden ...',
           msg: 'Ticket wird geladen ...',
           progressText: 'Bitte warten ...',
           width:300,
           progress:true,
          // closable:false
		  closable: true
       });
	   */
	   
		
		//var itemId = 'ticket'+record.get('ticketNumber');	
		var itemId = record.get('_id');
		var viewportTabPanel = Ext.getCmp('viewport').getComponent('centerTabPanel');
		
		var titleTabPanel = record.get('title');
		if (titleTabPanel.length > 24) {		
		titleTabPanel = titleTabPanel.substring(0, 24) + '...';
		}
		
	if(!viewportTabPanel.getComponent(itemId))
		{
			
			

					var showOneTicketItemId = record.get('_id');
					 
					viewportTabPanel.add({
						title: 'Ticket: ' + titleTabPanel,
    					tabConfig: {           
    						tooltip: 'Ticket: ' + titleTabPanel
    					},
    					layout: {
    						type: 'fit'
    					},
    					items: {
			                    xtype: 'showOneTicket',
                                title: '',
    							itemId: showOneTicketItemId
    						},	
                        autoScroll: true,
                        overflow: 'auto',
						itemId: itemId,
						closable: true
					}).show();
					//});

				
				var ticketPanel = viewportTabPanel.getComponent(itemId).down('#'+showOneTicketItemId);
				// Record im Tabpanel zwischenspeichern
				ticketPanel.dataRecord = record;
				ticketPanel.couchDBDocID = record.get('_id');
				
				ticketPanel.down('#oneTicketActionGrid').ticketRecord = record;
			
				if (record.get('owner') == sessionUserID || isAdmin===true) {
					ticketPanel.down('#oneTicketActionGrid').down('#editLastStatus').show();
				}
									 		
									 		
									 		
									 		
				ticketPanel.updateContent();
				
				//console.log(ticketPanel);
				//ticketPanel.query('#description').update(record.get('description'));
				//console.log('get query ticketPanel');
				//console.log(ticketPanel.down('#description'));
							
		
			// messageBoxLoadTicket.updateProgress(1.0, '100% abgeschlossen');
			
			
			// messageBoxLoadTicket.hide();
		} else {
			viewportTabPanel.setActiveTab(itemId);
		}

    },
    
    openTicketFromToolbar: function(button, e, options) {
    	var toolbar = button.up('toolbar'),
    		grid = toolbar.up('grid');
    	
    
    	 var selectTicket = grid.getView().getSelectionModel().getSelection()[0];
    	
    	if(selectTicket) {
    		
    		this.showOneTicketasNewTab(grid, selectTicket);

    	} else {
    	 Ext.MessageBox.show({
                title: 'Hinweis',
                msg: 'Bitte wählen Sie ein Support-Ticket zum &Ouml;ffnen aus!',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
    	}
    },
    
    onCurrentTicketsGridClick: function(tablepanel, record, item, index, e, options) {
    		
    		var actionsGrid =  Ext.getCmp('centerTabPanel').getComponent('currentTicketsTab').down('#currentActionsGrid');
				
				actionsGrid.couchDBDocID = record.get('_id');
				actionsGrid.setTitle('Aktionen zu Ticket: '+record.get('title'));
				actionsGrid.getStore().load({
					params: {
						"key": '"'+record.get('_id')+'"'
					}
				});
				
				// console.log(actionsGrid);
				var descriptionPanel = Ext.getCmp('centerTabPanel').getComponent('currentTicketsTab').down('#descriptionToCurrentTicketPanel');
				descriptionPanel.setTitle('Beschreibung zu Ticket: '+record.get('title'));							
				descriptionPanel.update(record.get('description'));	
				
    	
    },
    
    showOneActionInWindow: function(tablepanel, record, item, index, e, options) {
        var window = Ext.widget('showOneActionInWindow');		
        window.dataRecord = record;

        window.updateContent();
    },
    
    openActionFromToolbar: function(button, e, options) {
    	var toolbar = button.up('toolbar'),
    		grid = toolbar.up('grid');
    	
    
    	var selectAction = grid.getView().getSelectionModel().getSelection()[0];
    	
    	if(selectAction) {
    		
    		this.showOneActionInWindow(grid, selectAction);

    	} else {
    	 Ext.MessageBox.show({
                title: 'Hinweis',
                msg: 'Bitte wählen Sie eine Aktion zum &Ouml;ffnen aus!',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
    	}
    },
    
    showOneKBArticle: function(tablepanel, record, item, index, e, options) { 
    	var win = Ext.widget('showKBArticle');
    		win.updateContent(record);
    	
    }

});