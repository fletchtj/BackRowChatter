/*****************************************************************************/
/* Users Publish Functions
/*****************************************************************************/

Meteor.publish(null, function () {
  var userId = this.userId,
      fields = {status:1};
  return Meteor.users.find({_id:userId}, {fields: fields});
});

Meteor.publish('allUsers', function () {
  var options = {
  	sort: { "profile.name": 1 }
  };

  if (!this.userId) {
  	return this.ready();
  }
  
  if (!Roles.userIsInRole(this.userId, ["admin-role"])) {
  	_.extend(options, { fields: { "profile.name": 1 } });
  }

  return Meteor.users.find({}, options);
});