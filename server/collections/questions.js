Questions.allow({
  insert: function (userId, doc) {
    return false;
  },

  update: function (userId, doc, fieldNames, modifier) {
    modifier["$set"].lastModified = { by: userId, on: new Date().getTime() };
    return true;
  },

  remove: function (userId, doc) {
    return false;
  }
});

Questions.deny({
  insert: function (userId, doc) {
    return true;
  },

  update: function (userId, doc, fieldNames, modifier) {
    var nonAllowedFields = _.without(fieldNames, "message").length > 0
      , nonAdmin = !Roles.userIsInRole(userId, ["admin-role"])
      , nonOwner = doc.created.by !== userId;

    return nonAllowedFields || nonAdmin && nonOwner;
  },

  remove: function (userId, doc) {
    return true;
  }
});