
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
    
    displaySearchResult: function() {
    	
    	var itemId = 'searchResultTab';

                if(!Ext.getCmp('viewport').getComponent('centerTabPanel').getComponent(itemId))
                {
                    Ext.getCmp('viewport').getComponent('centerTabPanel').add({
                        title: 'Suchergebnis',
                        tabConfig: {           
                            tooltip: 'Anzeige des Suchergebnis'
                        },
                        layout: 'anchor',
                        items: {
                            title: 'Suchergebnis',
                            overflow: 'auto',
                            autoScroll: true,
                            xtype: 'allTicketsGrid',
                            store: 'searchStore',	
                            height: 550,
                            beforeRender: function() {	
                                
                            	// Aktualisieren Button deaktivieren	
                                this.down('#reloadButton').disable();

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
									});
                            }
                        },
                        itemId: itemId,
                        closable: true
                    }).show();
                } else {
                    Ext.getCmp('viewport').getComponent('centerTabPanel').setActiveTab(itemId);
                }
    	
    },
    
   getSearchResult: function() {
   	

// Ausgew�hlte Suchoption   	
var searchOption = this.searchOption.option;

// Tempor�res Array f�r die Suche
this.searchResArrTemp = new Array();


// Ergebnis der Suche in tempor�res Array + Unique!!
	for (var k = 0; k < this.searchResArr.length; k++) {
	   		
			for (var value in this.searchResArr[k]) {
			
	   		this.searchResArrTemp.push(this.searchResArr[k][value]);
	   		
			}
	   	}
	   	
this.searchResArrTemp = Ext.Array.unique(this.searchResArrTemp);	   	
	   	
// Suche nach allen Begriffen
   	
   if (searchOption == "allwords") {
   	
   	// Differenz Array f�r Suche
   	var arrDifference = new Array();
	
   	
  	for (var p = 0; p < this.searchResArr.length; p++) {
	// console.log("Temp Array");
   //	console.log(this.searchResArrTemp);
			
   	
   	// Differenz f�r Suche nach allen Begriffen ermitteln
	   		arrDifference = Ext.Array.difference(this.searchResArrTemp,this.searchResArr[p]);
	   //		console.log("differenz");
	   	//	console.log(arrDifference);
	   		
	   		for (var m = 0; m < arrDifference.length; ++m) {

	   		Ext.Array.remove(this.searchResArrTemp,arrDifference[m]);
	   		
	 }
	 	
}

 this.searchResArrCouchDB = this.searchResArrTemp;  	
   
   // Suche nach einzelnen Begriffen
   } else if (searchOption == "sepwords") {
	   	
	   	this.searchResArrCouchDB = this.searchResArrTemp;
   	}
   

   	
   	// URL Parameter f�r CouchDB setzen -> ?keys=
    var keyURLParam =  '"'+this.searchResArrCouchDB.toString()+'"';   
    
    // regexp /,/g (g for global)!!!
    // einzelne Parameter mit Komma trennen
    keyURLParam = keyURLParam.replace(/,/g,'","');

  	// Wait Message anzeigen	
 	var waitBox =  Ext.MessageBox.wait('Suchergebnis laden ...', 'Bitte warten ...');
            
    Ext.data.StoreManager.lookup('searchStore').getProxy().api.read = "../../_design/cstt/_view/allTickets?include_docs=true";
 	// Store fuer Suchergebnis laden
	Ext.data.StoreManager.lookup('searchStore').load({
        params: {
            "keys": '['+keyURLParam+']'

        },
        scope: this,
        callback: function() {
       
	        // Ergebnis der Suche darstellen
	       this.displaySearchResult();
	       waitBox.hide();
        }
    });
	
    },

    updateProgressDialog: function(box, currIndex, maxValue) {
    
    	var me = this;
    	
    	me.counterIndex = me.counterIndex + currIndex;	

        if (me.counterIndex == me.counterMaxValue) {

    		box.hide();
    		
    		// Suchfenster schliessen
    		me.close();
    		
    		// Suchergebnis laden
			this.getSearchResult();
    		
			} else {
    		
				var j = me.counterIndex  / me.counterMaxValue;
				box.updateProgress(j, Math.round(100*j)+'% geladen');

    		}

    },

    searchCouchDB: function (searchValue) {
    	
    	 this.searchResArr = new Array();
 
		 var messProgress = Ext.MessageBox.show({
           title: 'Bitte warten',
           msg: 'Suche in der Datenbank ...',
           progressText: 'Suche wird ausgef&uuml;hrt ...',
           width:350,
           progress:true,
           closable:true
       	});
       

    	// Suche nach mehreren W�rter m�ssen mit einem Leerzeichen getrennt sein, deshalb searchValue splitten!
        var searchValueArr = searchValue.split(" ");

        this.searchResArr = new Array();
        
        this.counterMaxValue = 0;
    		 
			// gehe jedes Wort durch
        	for (var i = 0; i < searchValueArr.length; ++i) {

      			this.counterMaxValue = this.counterMaxValue + i;
      			
      			// Trim auf Suchbegriff ausf�hren
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
        	
        	// Ausgew�hlte Suchoption zwischenspeichern
        	this.searchOption = this.down('#searchRadioOptions').getValue();
        	
        	// Suche in CouchDB ausf�hren
        	this.searchCouchDB(searchValue);
       }
 }

});