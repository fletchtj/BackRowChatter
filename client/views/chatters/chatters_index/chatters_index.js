/*****************************************************************************/
/* ChattersIndex: Event Handlers and Helpers .js*/
/*****************************************************************************/
Template.ChattersIndex.events({
  "click button[data-target=#showJoinCode]": function (e) {
    Session.set("join.code", this.joinCode);
  }
});

Template.ChattersIndex.helpers({
  userCount: function () {
    var userNum = _.size(this.users) || 0;
    return Utils.strings.pluralize(userNum, "user");
  }
  , questionCount: function () {
    var qCount = this.questionCount || 0;
    return Utils.strings.pluralize(qCount, "question");
  }
  , "createdOn": function () {
    return this.created.on;
  }
  , "curJoinCode": function () {
    return Session.get("join.code");
  }
});

/*****************************************************************************/
/* ChattersIndex: Lifecycle Hooks */
/*****************************************************************************/
Template.ChattersIndex.created = function () {
  $("#showJoinCode").on("hidden.bs.modal", function (e) {
    Session.set("join.code", null);
  });
};

Template.ChattersIndex.rendered = function () {
};

Template.ChattersIndex.destroyed = function () {
};