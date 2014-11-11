if (!Meteor.users.find().count()) {
	var adminId = Accounts.createUser({
		username: "admin"
		, password: "password"
		, profile: { name: "Admin User" }
	});

	if (adminId) {
		Roles.addUsersToRoles(adminId, "admin-role");
	}
}