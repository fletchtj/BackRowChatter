/* Router Hooks */
Iron.Router.hooks.requireAdminRole = function () {
	if (!Meteor.loggingIn()) {
		if (Meteor.userId() && Roles.userIsInRole(Meteor.userId(), ["admin-role"])) {
			this.next();
		} else {
			Router.go("dashboard");
		}
	}
}

Iron.Router.hooks.mustBeActiveUser = function () {
	if (!Meteor.loggingIn()) {
		if (Meteor.user() && Meteor.user().status === "active") {
			this.next();
		} else {
			Router.go("dashboard");
		}
	}
}