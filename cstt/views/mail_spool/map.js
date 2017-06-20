// Mail
function(doc) {
 if (doc.mail_spool == 'spooler' && doc.spooled == false) {
    emit(doc._id, doc);
 }
};   