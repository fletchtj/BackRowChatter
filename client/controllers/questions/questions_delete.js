QuestionsDeleteController = RouteController.extend({
  onBeforeAction: function () {
    var questionId = this.params._id
      , chatterId = this.params.chatterId;

    // remove the question
    Meteor.call("app/questions/delete", questionId, function (err, result) {
      if (err) {
        Flash.error(err.reason);
      } else {
        Flash.success("The question was deleted");
      }
      Router.go("chatters.show", { "_id": chatterId });
    });
    this.next();
  }
});