function(doc) {
    if (doc.type == 'staff') {
        emit(doc.username, doc);
    }
};
