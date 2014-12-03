RepliesDeleteController = RouteController.extend({
  onBeforeAction: function () {
    var replyId = this.params._id
      , questionId = this.params.questionId
      , chatterId = this.params.chatterId;

    // remove the reply
    Meteor.call("app/replies/delete", replyId, function (err, result) {
      if (err) {
        Flash.error(err.reason);
      } else {
        Flash.success("The reply was deleted");
      }
      Router.go("questions.show", { "chatterId": chatterId, "_id": questionId });
    });

    this.next();
  }
});