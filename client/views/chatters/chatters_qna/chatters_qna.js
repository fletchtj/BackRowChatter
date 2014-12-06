/*****************************************************************************/
/* _QnA: Event Handlers and Helpers .js*/
/*****************************************************************************/
Template._QnA.events({
  "submit #newQuestion": function (e, tmpl) {
    e.preventDefault();

    var question = Utils.forms.sArrayToObject($(e.currentTarget).serializeArray())
      , chatter = tmpl.data && tmpl.data.chatter;
    
    if (!chatter) {
      Growl.error("Could not find chatter.");
      return;
    }

    if (question.message) {
      question.chatterId = chatter._id;
      Meteor.call("/app/chatters/add/question", question, function (err, result) {
        if (err) {
          Growl.error(err);
        } else {
          $(e.currentTarget)[0].reset();
        }
      });
    } else {
      Growl.error("Please add some text and try again.", { title: "Doh?!" });
    }
    return false;
  }
  , "click a[href=#voteUp]": function (e) {
    e.preventDefault();
    Meteor.call("/app/questions/vote", { "count": 1, "questionId": this._id }, function (err, result) {
      if (err) {
        Growl.error(err);
      }
    });
  }
  , "click a[href=#voteDown]": function (e) {
    e.preventDefault();
    Meteor.call("/app/questions/vote", { "count": -1, "questionId": this._id }, function (err, result) {
      if (err) {
        Growl.error(err);
      }
    });
  }
});

Template._QnA.helpers({
  replyCount: function () {
    var _count = parseInt(this.replyCount) || 0;
    return { "num": _count, "label": (_count === 1) ? "reply" : "replies" };
  }
  , questionActions: function () {
    var loggedInUser = Meteor.user()
      , actions = []
      , editPath = Router.routes["questions.edit"].path({ "chatterId": this.chatterId, "_id": this._id })
      , deletePath = Router.routes["questions.delete"].path({ "chatterId": this.chatterId, "_id": this._id });

    if (this.created.by === loggedInUser._id || Roles.userIsInRole(loggedInUser, ["admin-role"])) {
      actions.push({ "actionPath": editPath, "actionLabel": "Edit" });
      actions.push({ "actionPath": deletePath, "actionLabel": "Delete" });
    }
    return actions;
  }
});

/*****************************************************************************/
/* _QnA: Lifecycle Hooks */
/*****************************************************************************/
Template._QnA.created = function () {

};

Template._QnA.rendered = function () {
};

Template._QnA.destroyed = function () {
};