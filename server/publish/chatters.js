/*****************************************************************************/
/* Chatters Publish Functions
/*****************************************************************************/

Meteor.publish('chatters', function () {
  var selector = { "status": { "$ne": "deleted" } };

  if (!Roles.userIsInRole(this.userId, ["admin-role"])) {
  	_.extend(selector, { "users": this.userId });
  }

  return Chatters.find(selector, { sort: { "created.on": -1 } });
});

Meteor.publish('chatter', function (chatterId) {
  var selector = { "_id": chatterId, "status": { "$ne": "deleted" } };

  if (!Roles.userIsInRole(this.userId, ["admin-role"])) {
  	_.extend(selector, { "users": this.userId });
  }
  
  return Chatters.find(selector);
});