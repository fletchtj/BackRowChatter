RepliesEditController = RouteController.extend({
  waitOn: function () {
  	return Meteor.subscribe("reply", this.params._id);
  },

  data: function () {
    return Replies.findOne(this.params._id);
  },

  action: function () {
  	if (Replies.findOne(this.params._id)) {
      this.render();  
    } else {
      this.render("NotFound");
    }
  }
});