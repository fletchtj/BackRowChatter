ChattersIndexController = RouteController.extend({
  waitOn: function () {
  	Meteor.subscribe("chatters");
  },

  data: function () {
  	return {
  		chatters: Chatters.find({}, { sort: { "created.on": -1 } })
  	}
  },

  action: function () {
    this.render();
  }
});