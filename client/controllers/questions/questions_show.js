QuestionsShowController = RouteController.extend({
  waitOn: function () {
  	return [
      Meteor.subscribe("chatter", this.params.chatterId)
      , Meteor.subscribe("question", this.params._id)
      , Meteor.subscribe("replies", this.params.chatterId, this.params._id)
    ];
  },

  data: function () {
  	return { 
  		chatter: Chatters.findOne(this.params.chatterId)
      , question: Questions.findOne(this.params._id)
      , replies: Replies.find({ "chatterId": this.params.chatterId, "questionId": this.params._id }, { sort: { "created.on": 1 } })
  	};
  },

  action: function () {
    this.render();
  }
});