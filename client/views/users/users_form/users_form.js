/*****************************************************************************/
/* UsersForm: Event Handlers and Helpers .js*/
/*****************************************************************************/
Template.UsersForm.events({
  "submit #userForm": function (e) {
    e.preventDefault();

    var existingUser = this || {}
      , formObj = Utils.forms.sArrayToObject($(e.currentTarget).serializeArray());
    
    if (formObj.roles && !_.isArray(formObj.roles)) {
      formObj.roles = [ formObj.roles ];
    }

    if (existingUser._id) {
      _.extend(formObj, { _id: existingUser._id });
    }

    Meteor.call("/app/users/save", formObj, function (err, result) {
      if (err) {
        Growl.error(err);
      } else {
        Flash.success("Successfully saved user.");
        Router.go("users.index");
      }
    });

    // console.log("user: ", this, " form: ", formObj);
    return false;
  }
});

Template.UsersForm.helpers({
  newUser: function () {
    return _.isEmpty(this);
  }
  , canManageUser: function () {
    return Roles.userIsInRole(Meteor.userId(), ["admin-role"]);
  }
  , statusOptions: function () {
    var user = this || {};
    if (!user.status) {
      user.status = "active";
    }
    return [
      { name: "status", type: "radio", label: "Awaiting Approval", value: "awaiting approval", isChecked: user.status === "awaiting approval" }
      , { name: "status", type: "radio", label: "Active", value: "active", isChecked: user.status === "active" }
      , { name: "status", type: "radio", label: "Disabled", value: "disabled", isChecked: user.status === "disabled" }
    ]
  }
  , roleOptions: function () {
    var user = this || {};
    if (!user.roles) {
      user.roles = [ "student-role" ];
    }
    return [
      { name: "roles", type: "checkbox", label: "Student", value: "student-role", isChecked: _.contains(user.roles, "student-role") }
      , { name: "roles", type: "checkbox", label: "Moderator", value: "moderator-role", isChecked: _.contains(user.roles, "moderator-role") }
      , { name: "roles", type: "checkbox", label: "Admin", value: "admin-role", isChecked: _.contains(user.roles, "admin-role") }
    ]
  }
});

/*****************************************************************************/
/* UsersForm: Lifecycle Hooks */
/*****************************************************************************/
Template.UsersForm.created = function () {
  // console.log(this.data);
};

Template.UsersForm.rendered = function () {
};

Template.UsersForm.destroyed = function () {
};