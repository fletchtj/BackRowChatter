/*****************************************************************************/
/* QuestionsShow: Event Handlers and Helpers .js*/
/*****************************************************************************/
Template.QuestionsShow.events({
  "submit #newReply": function (e, tmpl) {
    e.preventDefault();

    var reply = Utils.forms.sArrayToObject($(e.currentTarget).serializeArray())
      , chatter = Meteor._get(tmpl, "data", "chatter")
      , question = Meteor._get(tmpl, "data", "question");
    
    if (reply.message) {
      reply.chatterId = chatter._id;
      reply.questionId = question._id;
      Meteor.call("/app/questions/add/reply", reply, function (err, result) {
        if (err) {
          Growl.error(err);
        } else {
          $(e.currentTarget)[0].reset();
          $("textarea").select().focus();
        }
      });
    } else {
      Growl.error("Please add some text and try again.", { title: "Doh?!" });
    }
    return false;
  }
  , "click a[href=#voteUpQuestion]": function (e) {
    e.preventDefault();
    console.log(this);
    Meteor.call("/app/questions/vote", { "count": 1, "questionId": this._id }, function (err, result) {
      // console.log(err, result);
      if (err) {
        Growl.error(err);
      }
    });
  }
  , "click a[href=#voteDownQuestion]": function (e) {
    e.preventDefault();
    Meteor.call("/app/questions/vote", { "count": -1, "questionId": this._id }, function (err, result) {
      if (err) {
        Growl.error(err);
      }
    });
  }
  , "click a[href=#voteUpReply]": function (e) {
    e.preventDefault();
    // console.log(this);
    Meteor.call("/app/replies/vote", { "count": 1, "replyId": this._id }, function (err, result) {
      if (err) {
        Growl.error(err);
      }
    });
  }
  , "click a[href=#voteDownReply]": function (e) {
    e.preventDefault();
    Meteor.call("/app/replies/vote", { "count": -1, "replyId": this._id }, function (err, result) {
      if (err) {
        Growl.error(err);
      }
    });
  }
  , "click a[href=#acceptAnswer]": function (e, tmpl) {
    e.preventDefault();
    Meteor.call("/app/questions/acceptAnswer", tmpl.data.question._id, this._id, function (err, result) {
      if (err) {
        Growl.error(err);
      }
    });
  }
});

Template.QuestionsShow.helpers({
  questionOwner: function () {
    var _parentData = Template.parentData(1)
      , question = _parentData.question;
    return question && Meteor.userId() === question.created.by;
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
  , btnAccepted: function () {
    return this.isAnswer && "btn-success" || "btn-default";
  }
  , accepted: function () {
    return this.isAnswer && "accepted" || "";
  }
  , replyActions: function () {
    var loggedInUser = Meteor.user()
      , actions = []
      , editPath = Router.routes["replies.edit"].path({ "chatterId": this.chatterId, "questionId": this.questionId, "_id": this._id })
      , deletePath = Router.routes["replies.delete"].path({ "chatterId": this.chatterId, "questionId": this.questionId, "_id": this._id });

    if (this.created.by === loggedInUser._id || Roles.userIsInRole(loggedInUser, ["admin-role"])) {
      actions.push({ "actionPath": editPath, "actionLabel": "Edit" });
      actions.push({ "actionPath": deletePath, "actionLabel": "Delete" });
    }
    return actions;
  }
});

/*****************************************************************************/
/* QuestionsShow: Lifecycle Hooks */
/*****************************************************************************/
Template.QuestionsShow.created = function () {
};

Template.QuestionsShow.rendered = function () {
};

Template.QuestionsShow.destroyed = function () {
};