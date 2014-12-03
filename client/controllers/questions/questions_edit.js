QuestionsEditController = RouteController.extend({
  waitOn: function () {
  	return Meteor.subscribe("question", this.params._id);
  },

  data: function () {
    return Questions.findOne(this.params._id);
  },

  action: function () {
    if (Questions.findOne(this.params._id)) {
      this.render();  
    } else {
      this.render("NotFound");
    }
  }
});