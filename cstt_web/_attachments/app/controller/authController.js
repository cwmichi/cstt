Ext.define('cstt.controller.authController', {
    extend: 'Ext.app.Controller',
    refs: [{
        ref: "loginWindow",
        selector: "#loginWindow"
    }, {
        ref: "logoutButton",
        selector: "#logout"
    }, {
        ref: "userButton",
        selector: "#logoutButton"
    }, {
        ref: "loginForm",
        selector: "#loginForm"
    }
    ],
    onLogin: function(g, i, d) {
    	var loginWaitMsg =  Ext.MessageBox.wait('Überprüfe Daten ...','Anmelden ...');	
    	
    	
        var c = g.up("window");
        var h = c.down("form");
        
        if (h.isValid()) {
        // parameter fuer session name + password
        var b = h.getValues();
        
        b.name = b.name.toLowerCase();
        
        var loginParams = b;
        
        
        var a = function(k, e) {
        	loginWaitMsg.hide();
            cstt.app.fireEvent("loggedin", k.responseText);
            c.hide();
        };
        
        var j = function (k, e) {
        	loginWaitMsg.hide();
        	Ext.MessageBox.show({
                            title: 'Fehler',
                            msg: k.responseText,
                            buttons: Ext.MessageBox.OK,
                            scope: this,
                            closable: true,
                            modal: true,
                            icon: Ext.MessageBox.ERROR
                        });	
        };
        

        // Couch Post zu _session
        Ext.Ajax.request({
            url: "/_session",
            method: 'POST',
            loginSession: true,
            params: loginParams,
            success: a,
            failure: j
        });
        }
        else {
        	// Zeige Warnung - nicht alle Felder ausgefuellt
            boxWarningRequiredFields();
        }
    },
    onLaunch: function() {
    	
        var a = function(d, c) {
        	var json = Ext.JSON.decode(d.responseText);
        	
        	if(!Ext.isEmpty(json.userCtx.name)) {
            	cstt.app.fireEvent("loggedin", d.responseText);
           	}
        };
        
        var b = function(d, c) {};
        Ext.Ajax.request({
            url: "/_session",
            method: 'GET',
            success: a,
            failure: b
        });
    },
    init: function(a) {
        var b = this;
        Ext.FocusManager.enable();
        
        // Eingabe mit Return beim LoginFenster
        new Ext.KeyMap(document, {
            key: Ext.EventObject.RETURN,
            fn: function(h, i) {
                var c = Ext.FocusManager.focusedCmp;
                if (c) {
                    var d = c.up("window");
                    if (d) {
                        var g = d.down("#loginbutton");
                        if (g) {
                            b.onLogin(g);
                        }
                    }
                }
            }
        });
        
        
        Ext.util.Observable.observe(Ext.data.Connection);
        
        // unauthorized error 401 http
        Ext.data.Connection.on("requestexception", function(g, d, e) {
            if (d.status === 401) {
                b.application.fireEvent("logout");
                e.failure = function() {};
                var c = this.getLoginWindow();
                if (!c) {
                	// cstt loginWindow
                    c = Ext.widget("loginWindow");
                }

                if(!Ext.isEmpty(e.loginSession) && e.loginSession === true) {
                	Ext.MessageBox.hide();
                	var failedLoginMsg;
                	
                	var json = Ext.JSON.decode(d.responseText);
                	
                	switch(json.reason) {
                		
                		case "User is disabled for login":
                			failedLoginMsg = "Der Benutzer ist deaktiviert.";
                			break;
                		case "User is not allowed to login":
                			failedLoginMsg = "Der Benutzer darf sich nicht anmelden.";
                			break;
                		case "Name or password is incorrect.":
                			failedLoginMsg = "Der Benutzername oder das Passwort ist falsch.";
                			break;                			
                		default:
                		failedLoginMsg = json.reason;
                		break;
                	}
                	
                	Ext.MessageBox.show({
                            title: 'Anmeldung fehlgeschlagen',
                            msg: failedLoginMsg,
                            buttons: Ext.MessageBox.OK,
                            scope: c,
                            closable: true,
                            modal: true,
                            icon: Ext.MessageBox.ERROR
                        });	
                        
                }
                
               
                c.down('form').down('#username').focus();
                if(!Ext.isEmpty(c.down('form').down('#username').getValue())) {
                	c.setTitle("Sitzung abgelaufen: Bitte melden Sie sich an ...");
                	c.down('form').down('#username').setReadOnly(true);
                	c.down('form').down('#password').reset();
                	c.down('form').down('#password').focus();
                }
                //c.requestparams = e.params;
                //c.requesturl = e.url;
                c.show();
                
                if(!Ext.isSecure) {
    		function actionConfirm(btn){
                if (btn == 'yes') {						
                  window.location = 'https://cstt.cordaware.com/';
                }
            }	
						            
					            
		  	Ext.MessageBox.show({
		  		 title:'Keine sichere Verbindung !!!',
           msg: 'Möchten Sie zur sicheren Verbindung über HTTPs wechseln?',
           buttons: Ext.MessageBox.YESNO,
           fn: actionConfirm,
           icon: Ext.MessageBox.WARNING
		  	});
    		
    

    	}	
            }
            return false;
        }, this);
        this.control({
            "#loginbutton": {
                click: this.onLogin
            }
        });
        a.on({
            logout: {
                fn: this.onLogout,
                scope: this
            },
            loggedin: {
                fn: this.onLoggedin,
                scope: this
            }
        });
    },
    onLogout: function() {
    	// Alle Tasks stoppen!
    	Ext.TaskManager.stopAll();
    	
        this.getUserButton().setText("Bitte anmelden ...");
    },
    apply_user_config: function(user_doc) {
    	
    	sessionUserID = user_doc._id;
        sessionUsername = user_doc.username;
        sessionFullUsername = user_doc.staff_name;
        sessionEmail = user_doc.staff_email;
                        
                        
    	function convertBoolean(str) {
			  switch (str.toLowerCase ()) {
			    case "true":
			      return true;
			    case "false":
			      return false;							    
			  }
			}


        if (user_doc.isAdmin!==undefined) {
            isAdmin = convertBoolean(user_doc.isAdmin);
        }
        if (user_doc.isSupport!==undefined) {
            isSupport = convertBoolean(user_doc.isSupport);
        }
        if (user_doc.isSales!==undefined) {
            isSales = convertBoolean(user_doc.isSales);
        }
        if (user_doc.isTCOB !== undefined) {
            isTCOB = convertBoolean(user_doc.isTCOB);
        }	
        
        Ext.getStore('resellerStore').load();
        Ext.getStore('yearStore').load();
        
        Ext.data.StoreManager.lookup('allStaffStore').load({
	                    callback: function() {
				
				Ext.data.StoreManager.lookup('companyComboBoxStore').load();
	                Ext.data.StoreManager.lookup('companyConvertStore').load({
	                    callback: function() {
	                        Ext.data.StoreManager.lookup('ticketCurrentStore').load({
	                        	callback: function() {
	                        	}
	                        });
	                        Ext.data.StoreManager.lookup('ticket24HoursStore').load({
	                        	callback: function() {
	                        	}
	                        });
	                    }
                });
	                    }
	                    
	         });
	         
	         
	    // Starte CouchDB Changes nach der Anmeldung eines Benutzers
       	Ext.getCmp('viewport').couchDBChanges("now");     
        
        Ext.getCmp('viewport').doCSTTLayout();
    },
    onLoggedin: function(responseText) {
    	var json = Ext.JSON.decode(responseText);
    	var userCtx = json.userCtx;
    	// Hier sind alle Benutzer-Einstellungen enthalten wegen abwärtskompatibilität
    	var user_doc =  userCtx.cstt_user_doc;
    	
    	// Logout Button ändern
        this.getUserButton().setText("Angemeldet als: "+ user_doc.staff_name);
        
        this.apply_user_config(user_doc);

    }
});