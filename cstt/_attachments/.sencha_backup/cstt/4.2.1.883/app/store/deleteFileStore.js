Ext.define('cstt.store.deleteFileStore', {
    extend: 'cstt.store.base.deleteFileStore',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({}, cfg)]);
    }

});