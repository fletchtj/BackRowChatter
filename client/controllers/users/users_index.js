UsersIndexController = RouteController.extend({
  waitOn: function () {
  	Meteor.subscribe("allUsers");
  },

  data: function () {
  	return {
  		users: Meteor.users.find({}, { sort: { "profile.name": 1 } })
  	}
  },

  action: function () {
    this.render();
  }
});