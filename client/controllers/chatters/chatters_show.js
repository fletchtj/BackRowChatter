ChattersShowController = RouteController.extend({
  waitOn: function () {
  	return [
      Meteor.subscribe("chatter", this.params._id)
      , Meteor.subscribe("questions", this.params._id)
      , Meteor.subscribe("liveChatMessages", this.params._id)
    ];
  },

  data: function () {
  	return { 
  		chatter: Chatters.findOne(this.params._id)
      , questions: Questions.find({chatterId: this.params._id}, { sort: { "created.on": -1 } })
      , messages: LiveChatMessages.find({chatterId: this.params._id})
  	};
  },

  action: function () {
    if (Chatters.findOne(this.params._id)) {
      this.render();  
    } else {
      this.render("NotFound");
    }
  }
});