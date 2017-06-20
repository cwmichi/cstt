Ext.define('cstt.controller.csttController', {
    extend: 'Ext.app.Controller',
   	models: [
        'componentServerClientModel',
        'countryModel',
        'languageModel',
        'positionModel',
        'salutationModel',
        'ticketCurrentModel',
        'companyComboBoxModel',
        'actionModel',
        'allCustomersModel',
        'contactGridModel',
        'ticketAttachmentsModel',
        'versionManagementModel',
        'versionToCustomerModel',
        'staffGridModel',
        'commentModel',
        'chartTicketModel',
        'deleteFileModel',
        'actionStatusModel',
        'staffChartTicketModel',
        'yearModel',
        'resellerModel',
        'customerChartTicketModel'
    ],
    stores: [
        'salutationStore',
        'countryStore',
        'languageStore',
        'positionStore',
        'ticketCurrentStore',
        'editionProductStore',
        'addOnsStore',
        'companyComboBoxStore',
        'ticketProjectStore',
        'allCustomersStore',
        'ticketsToCustomerStore',
        'contactGridStore',
        'actionstoTicketHistory',
        'ticketHistoryStore',
        'ticket24HoursStore',
        'actionStore',
        'contactRequestStore',
        'ticketTypeStore',
        'contactToCompanyStore',
        'ticketAttachmentsStore',
        'storeComponentServerClient',
        'versionManagementStore',
        'versionCustomerStore',
        'allStaffStore',
        'actionstoTicketCurrent',
        'companyConvertStore',
        'commentStore',
        'searchStore',
        'ticketDeferredStore',
        'chartTicketStore',
        'deleteFileStore',
        'allStaffEmailStore',
        'actionStatusStore',
        'staffTicketChartStore',
        'yearStore',
        'resellerStore',
        'customerTicketChartStore'
    ],
    views: [
        'csttViewport',
        'csttHtmlEditor',
        'insertImageWindow',
        'newStaffForm',
        'createVersionWindow',
        'loginWindow',
        'uploadWindow',
        'ticketTypeComboBox',
        'actionWindow',
        'companyComboBox',
        'contactRequestComboBox',
        'createContactWindow',
        'createCustomerWindow',
        'contactPersonGrid',
        'contactsToCustomerWindow',
        'descriptionToCurrentTicket',
        'detailsToCustomerWindow',
        'editTicketWindow',
        'newTicketForm',
        'overviewVersionGrid',
        'showOneActionInWindow',
        'versionCustomerGrid',
        'showOneTicket',
        'searchWindow',
        'ticketPieChart',
        'deleteFileForm',
        'staffTicketChart',
        'yearComboBox',
        'changePasswordWindow',
        'resellerCombo',
        'resellerWindow',
        'customerTicketChart',
        'saveChartButton'
    ]
});