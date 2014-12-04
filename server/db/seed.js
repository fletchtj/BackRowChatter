if (!Meteor.users.find().count()) {
	var adminId = Accounts.createUser({
		username: "admin"
		, password: "backRowAdminPass"
		, profile: { name: "Admin User" }
	});

	if (adminId) {
		Roles.addUsersToRoles(adminId, "admin-role");
	}
}