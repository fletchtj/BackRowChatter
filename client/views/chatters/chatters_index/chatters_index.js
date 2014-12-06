/*****************************************************************************/
/* ChattersIndex: Event Handlers and Helpers .js*/
/*****************************************************************************/
Template.ChattersIndex.events({
  "click a[data-target=#showJoinCode]": function (e, tmpl) {
    Session.set("join.code", this.joinCode);
  }
  , "submit #joinChatter": function (e) {
    e.preventDefault();
    var code = Utils.strings.trimInput($("input[name=joinCode]").val());
    
    if (code) {
      Meteor.call("/app/chatters/join", code, function (err, result) {
        // console.log(err, result);
        if (err) {
          Growl.error(err);
        }
      });
    }
    
    return false;
  }
});

Template.ChattersIndex.helpers({
  canCreateChatter: function () {
    return Roles.userIsInRole(Meteor.userId(), ["admin-role"])
  }
  , userCount: function () {
    var userNum = _.size(this.users) || 0;
    return Utils.strings.pluralize(userNum, "user");
  }
  , questionCountLabel: function () {
    var qCount = this.questionCount || 0;
    return Utils.strings.pluralize(qCount, "question");
  }
  , curJoinCode: function () {
    return Session.get("join.code");
  }
  , statusLabel: function () {
    var styleClasses = {
      open: "label-success"
      , closed: "label-danger"
      , archived: "label-warning"
    };

    return { 
      styleClass: styleClasses[this.status]
      , status: this.status
    };
  }
  , chatterActions: function () {
    var loggedInUser = Meteor.user()
      , actions = []
      , editPath = Router.routes["chatters.edit"].path({ "_id": this._id })
      , deletePath = Router.routes["chatters.delete"].path({ "_id": this._id });
      
    if (this.created.by === loggedInUser._id || Roles.userIsInRole(loggedInUser, ["admin-role"])) {
      actions.push({ "template": "_ChatterActionModal", "templateData": { "actionTarget": "#showJoinCode", "actionLabel": "Display Join Code", "joinCode": this.joinCode } });
      actions.push({ "template": "_ChatterActionLink", "templateData": { "actionPath": editPath, "actionLabel": "Edit" } });
      actions.push({ "template": "_ChatterActionLink", "templateData": { "actionPath": deletePath, "actionLabel": "Delete" } });
    }
    return actions;
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