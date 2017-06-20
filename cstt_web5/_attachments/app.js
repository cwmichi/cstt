// Alle Klassen einbinden
Ext.require('*');

Ext.application({ 
    name: 'cstt',
    appFolder: 'app',
    controllers: [
        'customer',
        'tickets',
        'csttController',
        'authController'
    ],
    autoCreateViewport: true,
    launch: function() {
    	
    	Ext.tip.QuickTipManager.init();

delete Ext.tip.Tip.prototype.minWidth;

// Default Timeout auf 5 min setzen
Ext.Ajax.timeout = 5*60*1000; //5 minutes


Ext.util.ms_print = function(element) {

	 var myWindow = window.open('', '', 'width=800,height=600');
	        myWindow.document.write('<html><head>');
	        myWindow.document.write('<title>' + 'Drucken' + '</title>');
	        myWindow.document.write('<link rel="Stylesheet" type="text/css" href="css/print.css" />');
	        myWindow.document.write('</head><body>');
	        myWindow.document.write(element.body.dom.innerHTML);
	        myWindow.document.write('</body></html>');
	        myWindow.print();
}

          // Add the additional 'advanced' VType
    Ext.apply(Ext.form.field.VTypes, {
                password: function(val, field) {
            if (field.initialPassField) {
                var pwd = field.up('form').down('#' + field.initialPassField);
                return (val == pwd.getValue());
            }
            return true;
        },

        passwordText: 'Passwort stimmen nicht &uuml;berein!'
    }); 
    
    Ext.apply(Ext.form.field.VTypes, {
	uniqueNameText: 'Der angegebene Wert ist bereits vorhanden. Bitte w&auml;hlen Sie einen anderen Wert/Text.',
    //  vtype validation function
    uniqueName: function(val, field) {

    if(!Ext.isEmpty(field.uniqueURL)) {
    	
    	if(typeof field.originalValue != 'undefined' && field.isEqual(Ext.util.Format.lowercase(val), Ext.util.Format.lowercase(field.originalValue))) {
    		return true;	
    	}
    	
		var trimValue = Ext.util.Format.trim(val);			
      
		var lowercase = Ext.util.Format.lowercase(trimValue);
		var uppercase = Ext.util.Format.uppercase(trimValue);
      
		// TODO: Hier müssen noch Anführungszeichen durch Bachslashes gesetzt werden
      
 			Ext.Ajax.request({
                method: 'GET',
                async: false,
                url: field.uniqueURL + '?startkey="'+encodeURIComponent(lowercase)+'"&endkey="'+encodeURIComponent(uppercase)+'"',
                // Header auf application/json setzen - CouchDB
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                callback : function(opts, success, response) {
				var json = Ext.JSON.decode(response.responseText);

		                 if (!Ext.isEmpty(json.rows) && json.rows.length > 0) {
							result = false;

		                 } else {
		                 	result = true;
		                 }
                	
   				 }
            });
            
    	}    

     return result;
    }
});



Ext.apply(Ext.form.field.VTypes, {
    tvs : function(val, field) {
	// Nur GIF, PNG, JPEG, JPG erlaubt
        var fileName = /^.*\.(tvs)$/i;
        return fileName.test(val);
    },
    tvsText : "Erlaubte Dateiendungen für Remotesitzungen: (*.tvs)"
 
});


        // Override for adding tooltips to form fields
Ext.override(Ext.form.Field, {
    afterRender : function() 
    {         
        this.callParent(arguments);   
        try {
            if(this.biTooltipText)
            {
                create_tooltip_fields(this, this.biTooltipText);
            }
        } catch(e){}
    }
});

function create_tooltip_fields(field, tooltipText)
{
    Ext.QuickTips.register({
        target:  field.getEl(),
        title: '',
        text: '<span style="">' + tooltipText +'</span>',
        enabled: true,
        trackMouse: true
    });
    var label = findLabel(field);
    if(label)
    {
        Ext.QuickTips.register({
            target:  label,
            title: '',
            text: '<span style="">' + tooltipText +'</span>',
            enabled: true,
            trackMouse: true
        });
    }
}

var findLabel = function(field) {
    
    var wrapDiv = null;
    var label = null

    // find form-element and label
    wrapDiv = field.getEl().up('div.x-form-element');
    if(wrapDiv)
        label = wrapDiv.child('label');
    
    if(label)
        return label;
    
    // find form-item and label
    wrapDiv = field.getEl().up('div.x-form-item');
    if(wrapDiv)
        label = wrapDiv.child('label');
    
    if(label)
        return label;
}


        
        
        
        Ext.define('Ext.form.action.SubmitCouchDB', {
    		override: 'Ext.form.action.Submit',
    		onSuccess: function(response) {

				var form = this.form,
				success = true,
				result = this.processResponse(response);
				
				// Änderungen für CouchDB Dateiuploads
				if(form.owner.couchUpload === true) {
					result = true;
					
				}
				// Ende Änderungen für CouchDB Dateiuploads
				
				if (result !== true && !result.success) {
				if (result.errors) {
				form.markInvalid(result.errors);
				}
				this.failureType = Ext.form.action.Action.SERVER_INVALID;
				success = false;
				}
				
				form.afterAction(this, success);
			}

    	});
    	

    	
        // Benutzerdefinierter VType f&uuml;r Versionsverwaltung
        Ext.apply(Ext.form.VTypes, {
            versionBI:  function(v) {
                return /^([0-9]).([0-9]).([0-9]).([0-9])$/.test(v);
            },
            versionBIText: 'Erlaubtes Format f&uuml;r Version, z. B.: 5.1.0.3',
            versionBIMask: /[\d\.]/i
        });	
    	
    	Ext.example = function(){
            var msgCt;

            function createBox(t, s){
                // return ['<div class="msg">',
                //         '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
                //         '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
                //         '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
                //         '</div>'].join('');
                return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
            }
            return {
                msg : function(title, format){
                    if(!msgCt){
                        msgCt = Ext.core.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
                    }
                    var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
                    var m = Ext.core.DomHelper.append(msgCt, createBox(title, s), true);
                    m.hide();
                    m.slideIn('t').ghost("t", { delay: 4000, remove: true});
                },

                init : function(){
                    //            var t = Ext.get('exttheme');
                    //            if(!t){ // run locally?
                    //                return;
                    //            }
                    //            var theme = Cookies.get('exttheme') || 'aero';
                    //            if(theme){
                    //                t.dom.value = theme;
                    //                Ext.getBody().addClass('x-'+theme);
                    //            }
                    //            t.on('change', function(){
                    //                Cookies.set('exttheme', t.getValue());
                    //                setTimeout(function(){
                    //                    window.location.reload();
                    //                }, 250);
                    //            });
                    //
                    //            var lb = Ext.get('lib-bar');
                    //            if(lb){
                    //                lb.show();
                    //            }
                }
            };
        }();




        // Cookie
        Ext.state.Manager.setProvider(new Ext.state.CookieProvider({
            expires: new Date(new Date().getTime()+(1000*60*60*24*30)) // 30 Tage ab jetzigem Zeitpunkt
        }));
        
        // Disable state management for all components by default:
        Ext.Component.prototype.stateful = false;
    	
    }
});
