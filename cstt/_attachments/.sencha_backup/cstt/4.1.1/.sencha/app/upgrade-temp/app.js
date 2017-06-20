Ext.Loader.setConfig({
    enabled: true
});

// Alle Klassen einbinden
Ext.require('*');

Ext.application({ 
    name: 'cstt',
    appFolder: 'app',
    controllers: [
        'customer',
        'tickets',
        'csttController'
    ],
    autoCreateViewport: true
});