ChattersShowController = RouteController.extend({
  waitOn: function () {
  	return [
      Meteor.subscribe("chatter", this.params._id)
      , Meteor.subscribe("questions", this.params._id)
    ];
  },

  data: function () {
  	return { 
  		chatter: Chatters.findOne(this.params._id)
      , questions: Questions.find({chatterId: this.params._id}, { sort: { "created.on": -1 } })
  	};
  },

  action: function () {
    this.render();
  }
});