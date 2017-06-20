function(doc) {
// Versionsverwaltung
if (doc.type == 'versionOverview') {
  emit(doc.component, {_id: doc._id, _rev: doc._rev, component: doc.component, version: doc.version, creator_ID: doc.creator_ID});
}
};
