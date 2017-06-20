Ext.tip.QuickTipManager.init();

// Default Timeout auf 60 Sekunden setzen
Ext.Ajax.timeout = 60000; // 60 Sekunden

          // Add the additional 'advanced' VTypes
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
    	
    	Ext.define('Ext.form.SubmitFix', {
    override: 'Ext.ZIndexManager',


    register : function(comp) {
        var me = this,
            compAfterHide = comp.afterHide;
        
        if (comp.zIndexManager) {
            comp.zIndexManager.unregister(comp);
        }
        comp.zIndexManager = me;

        me.list[comp.id] = comp;
        me.zIndexStack.push(comp);
        
        // Hook into Component's afterHide processing
        comp.afterHide = function() {
            compAfterHide.apply(comp, arguments);
            me.onComponentHide(comp);
        };
    },

    /**
     * Unregisters a {@link Ext.Component} from this ZIndexManager. This should not
     * need to be called. Components are automatically unregistered upon destruction.
     * See {@link #register}.
     * @param {Ext.Component} comp The Component to unregister.
     */
    unregister : function(comp) {
        var me = this,
            list = me.list;
        
        delete comp.zIndexManager;
        if (list && list[comp.id]) {
            delete list[comp.id];
            
            // Relinquish control of Component's afterHide processing
            delete comp.afterHide;
            Ext.Array.remove(me.zIndexStack, comp);

            // Destruction requires that the topmost visible floater be activated. Same as hiding.
            me._activateLast();
        }
    }
});