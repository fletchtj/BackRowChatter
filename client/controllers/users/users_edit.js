UsersEditController = RouteController.extend({
  data: function () {
    return Meteor.users.findOne(this.params._id);
  },

  action: function () {
    if (Meteor.users.findOne(this.params._id)) {
      this.render();  
    } else {
      this.render("NotFound");
    }
  }
});