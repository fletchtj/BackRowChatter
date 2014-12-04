/*****************************************************************************/
/* Dashboard: Event Handlers and Helpers .js*/
/*****************************************************************************/
Template.Dashboard.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Dashboard.helpers({
  actionLinks: function () {
    // what can the user do
    var links = []
      , user = Meteor.user();

    if (user) {
      if (Roles.userIsInRole(user._id, ["admin-role", "student-role"]) && user.status === "active" ) {
        links.push({ actionUrl: Router.routes["chatters.index"].path(), actionLabel: "View Chatter Topics"});
      }

      if (Roles.userIsInRole(user._id, ["admin-role"])) {
        links.push({ actionUrl: Router.routes["users.index"].path(), actionLabel: "Manage Site Users"});
      }
    }
    return links;
  }
  , accountStatus: function () {
    var user = Meteor.user()
      , status;
    // console.log(user.status);
    if (user.status !== "active") {
      status = { styleClass: "label label-danger", label: user.status.toUpperCase() };
      if (user.status === "awaiting approval") {
        status.styleClass = "label label-warning";
      }
    }
    // console.log(status);
    return status;
  }
});

/*****************************************************************************/
/* Dashboard: Lifecycle Hooks */
/*****************************************************************************/
Template.Dashboard.created = function () {
};

Template.Dashboard.rendered = function () {
};

Template.Dashboard.destroyed = function () {
};