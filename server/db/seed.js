if (!Meteor.users.find().count()) {
	var adminId = Accounts.createUser({
		username: "admin"
		, password: "backRowAdminPass"
		, profile: { name: "Admin User", status: "active", roles: [ "admin-role" ] }
	});

	if (adminId) {
		Roles.addUsersToRoles(adminId, "admin-role");
	}
}