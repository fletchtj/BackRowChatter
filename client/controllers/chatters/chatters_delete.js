ChattersDeleteController = RouteController.extend({
  onBeforeAction: function () {
    var chatterId = this.params._id;

    // remove the chatter topic
    Meteor.call("app/chatters/delete", chatterId, function (err, result) {
      if (err) {
        Flash.error(err.reason);
      } else {
        Flash.success("The question was deleted");
      }
      Router.go("chatters.index");
    });
    this.next();
  }
});