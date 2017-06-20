
Ext.define('cstt.view.searchWindow', {
    extend: 'cstt.view.ui.searchWindow',
    alias: 'widget.searchWindow',

    initComponent: function() {

        var me = this;
        me.callParent(arguments);
    },

    onCloseButtonClick: function(button, e, options) {
        this.close();
    },
    
    displaySearchResult: function(resArr) {
    	
    	var itemId = 'searchResultTab';

                if(!Ext.getCmp('viewport').getComponent('centerTabPanel').getComponent(itemId))
                {
                    Ext.getCmp('viewport').getComponent('centerTabPanel').add({
                        title: 'Suchergebnis',
                        tabConfig: {           
                            tooltip: 'Anzeige des Suchergebnis'
                        },
                        layout: 'fit',
                        items: [{
                            title: 'Suchergebnis',
                            overflow: 'auto',
                            autoScroll: true,
                            xtype: 'allTicketsGrid',
                            store: 'searchStore',
                            itemId: 'searchGrid',
                            height: 550,
                            selModel: Ext.create('Ext.selection.CheckboxModel', {

           					 }),
                            beforeRender: function() {	
                                
                            	// Aktualisieren Button deaktivieren	
                                this.down('#reloadButton').disable();
                                
                                
                                this.addDocked({
                                            		// TODO: Anzahl der Datenbanken ausgeben
	                                                xtype: 'toolbar',
	                                                dock: 'bottom',
	                                                items: [
				                                    	 {
                                                            xtype: 'tbtext',
                                                            text: ''
                                                        },
				                                    	{
	                                                            xtype: 'tbfill'
                                                        }]
			                                    	
			                                    	});

								this.down('#topToolbar').add({
										xtype: 'tbseparator'
										},{
										xtype: 'button',
										iconCls: 'search',
										text: 'Suche nach Tickets',
										tooltip: '&Ouml;ffnet ein Formular zur Suche ...',
										listeners: {
											click: {
												fn: function() {
													Ext.getCmp('viewport').onPressSearch();
												}
											}
										}
									},{
										xtype: 'tbseparator'
										},{
										xtype: 'button',
										iconCls: 'database_table',
										text: 'Export',
										tooltip: 'Exportiert Support-Tickets als E-Mail',
										listeners: {
											click: {
												fn: function() {
														var grid = Ext.getCmp('viewport').getComponent('centerTabPanel').getComponent(itemId).down('#searchGrid');
														var selection = grid.getView().getSelectionModel().getSelection();	
				
														if(selection.length > 0) {
															
															var win = Ext.widget('exportTickets');
														
														Ext.data.StoreManager.lookup('allStaffEmailStore').load();
														
															
															var arr = new Array();
															
															Ext.Array.each(selection, function(rec) {
														       arr.push(rec.data._id);
														    });
														    
															win.ticketArray = arr;
														} else {
												    	 Ext.MessageBox.show({
												                title: 'Hinweis',
												                msg: 'Bitte wÃ¤hlen Sie Tickets zum Export aus!',
												                buttons: Ext.MessageBox.OK,
												                icon: Ext.MessageBox.INFO
												            });
												    	}
												}
											}
										}
									});
                            }
                        }],
                        itemId: itemId,
                        closable: true
                    }).show();
                } else {
                    Ext.getCmp('viewport').getComponent('centerTabPanel').setActiveTab(itemId);
                }
                
                
          		var grid = Ext.getCmp('viewport').getComponent('centerTabPanel').getComponent(itemId).down('#searchGrid');
          		
          		grid.resArr = resArr;
          		
          		this.onSearchResultRefreshProceed(grid);
   
    
    
    
    	
    },
    
   getSearchResult: function() {
   	

// Ausgewï¿½hlte Suchoption   	
var searchOption = this.searchOption.option;

// Temporï¿½res Array fï¿½r die Suche
this.searchResArrTemp = new Array();


// Ergebnis der Suche in temporï¿½res Array + Unique!!
	for (var k = 0; k < this.searchResArr.length; k++) {
	   		
			for (var value in this.searchResArr[k]) {
			
	   		this.searchResArrTemp.push(this.searchResArr[k][value]);
	   		
			}
	   	}
	   	
this.searchResArrTemp = Ext.Array.unique(this.searchResArrTemp);	   	
	   	
// Suche nach allen Begriffen
   	
   if (searchOption == "allwords") {
   	
   	// Differenz Array fï¿½r Suche
   	var arrDifference = new Array();
	
 
  	for (var p = 0; p < this.searchResArr.length; p++) {
	
  		  	if(!Ext.isEmpty(this.searchResArr[p])) {
   				arrDifference = Ext.Array.difference(this.searchResArrTemp,this.searchResArr[p]);
  		  	}

  	}
  	
	   		
	   		for (var m = 0; m < arrDifference.length; ++m) {

	   		Ext.Array.remove(this.searchResArrTemp,arrDifference[m]);
	   		
	 }
	 
	 this.searchResArrCouchDB = this.searchResArrTemp;  
   
   // Suche nach einzelnen Begriffen
   } else if (searchOption == "sepwords") {
	   	
	   	this.searchResArrCouchDB = this.searchResArrTemp;
   	}
   
  	// Wait Message anzeigen	
 //	var waitBox =  Ext.MessageBox.wait('Suchergebnis laden ...', 'Bitte warten ...');
            
    Ext.data.StoreManager.lookup('searchStore').getProxy().api.read = "../../_design/cstt/_view/allTickets?include_docs=true";
    
    Ext.data.StoreManager.lookup('searchStore').searchValue = this.searchValue;
    
    this.displaySearchResult(this.searchResArrCouchDB);
	// waitBox.hide();
    
	
    },

    updateProgressDialog: function(box, currIndex, maxValue) {
    
    	var me = this;
    	
    	me.counterIndex = me.counterIndex + currIndex;	
		//console.log(me.counterIndex);
		//console.log(me.counterMaxValue);
        if (me.counterIndex == me.counterMaxValue) {

    		box.hide();
    		
    		// Suchfenster schliessen
    		me.close();
    		// console.log("get search result");
    		// Suchergebnis laden
			this.getSearchResult();
    		
			} else {
    		
				var j = me.counterIndex  / me.counterMaxValue;
				box.updateProgress(j, Math.round(100*j)+'% geladen');

    		}

    },

    searchCouchDB: function (searchValue) {
    	
    	this.searchValue = searchValue;
    	
    	 this.searchResArr = new Array();
 
		 var messProgress = Ext.MessageBox.show({
           title: 'Bitte warten',
           msg: 'Suche in der Datenbank ...',
           progressText: 'Suche wird ausgef&uuml;hrt ...',
           width:350,
           progress:true,
           closable:true
       	});
       

    	// Suche nach mehreren Wï¿½rter mï¿½ssen mit einem Leerzeichen getrennt sein, deshalb searchValue splitten!
        var searchValueArr = searchValue.split(" ");

        this.searchResArr = new Array();
        
        this.counterMaxValue = 0;
    		 
			// gehe jedes Wort durch
        	for (var i = 0; i < searchValueArr.length; ++i) {

      			this.counterMaxValue = this.counterMaxValue + i;
      			
      			// Trim auf Suchbegriff ausfï¿½hren
      			var searchValueTrim = Ext.util.Format.trim(searchValueArr[i]);
      			
      			
      			var lowercase = Ext.util.Format.lowercase(searchValueTrim);
      			lowercase = encodeURIComponent(lowercase);
      			var uppercase = Ext.util.Format.uppercase(searchValueTrim);
				uppercase = encodeURIComponent(uppercase);
				uppercase = uppercase + '\\ufff0';
				
				Ext.Ajax.request({
                method: 'GET',
                url: '../../_design/search/_view/ticketSearch?startkey="'+lowercase+'"&endkey="'+uppercase+'"',
                // Header auf application/json setzen - CouchDB
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                scope: this,
                currentIndex: i,
                maxArrLength: searchValueArr.length,
                messProgress: messProgress,
                
                callback : function(opts, success, response) {
                	
                	var box = opts.messProgress;
                	var currIndex = opts.currentIndex;
                	var maxValue = opts.maxArrLength;

                  	this.searchResArr[currIndex] = new Array(); 

                	
                	if (success === true) {
                	
                	
                	
                	var json = Ext.JSON.decode(response.responseText);

                	
	                 	for (var j = 0; j < json.rows.length; j++ ) {
	                 		this.searchResArr[currIndex].push(json.rows[j].value);
	                 	}
	                 	
	                 	this.searchResArr[currIndex] = Ext.Array.unique(this.searchResArr[currIndex]);

	                // Update Progess am Ende, damit searchResArr ausgelesen wird!
	                this.updateProgressDialog(box, currIndex, maxValue);	
	                 	
	                 	
                	} else {
   				 
   				 box.hide();
			   Ext.MessageBox.show({
			           title: 'Fehler bei der Suche',
			           msg: 'Die Suche kann aufgrund eines Fehlers nicht ausgef&uuml;hrt werden!',
			           buttons: Ext.MessageBox.OK,
			           icon: Ext.MessageBox.ERROR
			       });
   			
                	}
   				 }
            });
            
            
            
            
        	}
      
    	
    
    },

    onSearchButtonClick: function(button, e, options) {

    	// Hole Suchbegriffe aus Formular
        var searchValue = this.down('#searchValue').getValue();
 
        if (Ext.isEmpty(searchValue)) {
        	Ext.MessageBox.show({
                    title: 'Hinweis',
                    msg: 'Bitte geben Sie einen Suchbegriff ein!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
        
        } else {
        	
        	// Ausgewï¿½hlte Suchoption zwischenspeichern
        	this.searchOption = this.down('#searchRadioOptions').getValue();
        	
        	// Suche in CouchDB ausfï¿½hren
        	this.searchCouchDB(searchValue);
       }
 },
 
     getSkipDbs: function(grid) {
    	
    	var array	= grid.resArr;
    	var lenDbs 	= array.length;
    	var skip 	= 100;
    	var toolbar = grid.getDockedItems();
    	var tbtext	= toolbar[2].down('tbtext');
    	
    	// Text in der Toolbar setzen.
    	var text = 'Anzahl der Suchergebnisse: <b>{total}</b>.';
    	
    	text = text.replace('{total}', lenDbs);
    	
    	tbtext.setText(text);

    	
    	this.loadSearchStore(grid.resArr);
    },
    
    loadingStore: function(array) {
    	// URL Parameter fï¿½r CouchDB setzen -> ?keys=
    var keyURLParam =  '"'+array.toString()+'"';   
    
    // regexp /,/g (g for global)!!!
    // einzelne Parameter mit Komma trennen
    keyURLParam = keyURLParam.replace(/,/g,'","');
    	var waitBox =  Ext.MessageBox.wait('Suchergebnis laden ...', 'Bitte warten ...');
    
    	
    	var tempStore = new Ext.data.Store({
    		model: 'cstt.model.ticketCurrentModel'
    	})
    	
    	tempStore.getProxy().api.read = "../../_design/cstt/_view/allTickets?include_docs=true";
    	
    	
    	// Store fuer Suchergebnis laden
		tempStore.load({
        params: {
            "keys": '['+keyURLParam+']'

        },
        scope: this,
        callback: function(records) {
        	Ext.data.StoreManager.lookup('searchStore').add(records);
        	Ext.data.StoreManager.lookup('searchStore').sort('ticketNumber', 'DESC');

        	waitBox.hide();
        }
    });
    
 
                
   
    },
    
    loadSearchStore: function(resArr) {
    	
    	var array = new Array();
    	var counter = 0;
    	var maxCount = 0;
    	var maxLimit = resArr.length;
    	
    	var limit = 99;
    	
    	Ext.Array.each(resArr, function(ID) {
    		counter++;
    		maxCount++;
    		
    		array.push(ID);
    		
    		if(counter === limit || maxCount === maxLimit) {
    			
    			
    			this.loadingStore(array);
    			
    			array = new Array();
    			counter = 0;
    		}
    	
    	}, this);
    
   
    
    },

    onSearchResultRefreshProceed: function(grid) {
    	var toolbar = grid.getDockedItems();

    
    		// Store zurŸck setzen
    		Ext.getStore('searchStore').removeAll();

			this.getSkipDbs(grid);
				
    	
    }
   
 

});