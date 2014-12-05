/*****************************************************************************/
/* Users Methods */
/*****************************************************************************/

Meteor.methods({
	"/app/users/setPassword": function (userId, newPassword) {
		return Accounts.setPassword(userId, newPassword);
	}
	, "/app/users/save": function (user) {
		var loggedInUser = Meteor.user()
			, isAdmin
			, isUser;

		if (!user) {
			throw new Meteor.Error(500, "Unable to locate user.");
		}

		isAdmin = loggedInUser && Roles.userIsInRole(loggedInUser, ["admin-role"]);
		isUser = loggedInUser && user._id && loggedInUser === user._id;
		
		if (!isAdmin && !isUser) {
			throw new Meteor.Error(403, "Access denied");
		}

		if (user._id) {
			// update existing user
			var modifier = {};

			if (isAdmin) {
				if (user.roles) {
					modifier["roles"] = user.roles;
				}
				if (user.status) {
					modifier["status"] = user.status;
				}
			}
			
			if (user.name) {
				modifier["profile.name"] = user.name;	
			}
			
			if (user.emailAddress) {
				modifier["profile.emailAddress"] = user.emailAddress;	
			}

			return Meteor.users.update(user._id, { "$set": modifier });

		} else {
			return Accounts.createUser({
				"username": user.username
				, "password": user.password
				, "profile": {
					"name": user.name
					, "emailAddress": user.emailAddress
					, "roles": user.roles
					, "status": user.status
				}
			});
		}
	}
	, "/app/users/import": function (users) {
		var loggedInUser = Meteor.user()
			, isAdmin
			, results = { errors: [], success: [] }
			, newUserId;

		if (!users) {
			throw new Meteor.Error(500, "Unable to locate users");
		}

		isAdmin = loggedInUser && Roles.userIsInRole(loggedInUser, ["admin-role"]);
		
		if (!isAdmin) {
			throw new Meteor.Error(403, "Access denied");
		}

		_.each(users, function (user) {

			newUserId = Accounts.createUser({
				"username": user.username
				, "password": user.password
				, "profile": {
					"name": user.name
					, "emailAddress": user.emailAddress
					, "roles": [ "student-role" ]
					, "status": "active"
				}
			});

			if (newUserId) { 
				results.success.push(newUserId);
			} else {
				results.errors.push(user);
			}
		});

		return results;
		
	}
});