ChattersShowController = RouteController.extend({
  waitOn: function () {
  	return Meteor.subscribe("chatter", this.params._id);
  },

  data: function () {
  	return { 
  		chatter: Chatters.findOne(this.params._id) 
  	};
  },

  action: function () {
    this.render();
  }
});