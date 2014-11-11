ChattersIndexController = RouteController.extend({
  waitOn: function () {
  	Meteor.subscribe("chatters");
  },

  data: function () {
  	return {
  		chatters: Chatters.find()
  	}
  },

  action: function () {
    this.render();
  }
});