function(doc) {
// Versionsuebersicht
  if (doc.type == 'historyVersionCustomer') {
     emit([doc.customerDocID, doc.component], {component: doc.component, date: doc.date, patchDate: doc.patchDate, version: doc.version});
  }
};
