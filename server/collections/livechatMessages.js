LiveChatMessages.allow({
  insert: function (userId, doc) {
    return true;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return false;
  },

  remove: function (userId, doc) {
    return false;
  }
});

LiveChatMessages.deny({
  insert: function (userId, doc) {
    var chatter = Chatters.findOne(doc.chatterId);
    if (!chatter) { return true; }
    return !Roles.userIsInRole(userId, ["admin-role"]) && !_.contains(chatter.users, userId);
  },

  update: function (userId, doc, fieldNames, modifier) {
    return true;
  },

  remove: function (userId, doc) {
    return true;
  }
});