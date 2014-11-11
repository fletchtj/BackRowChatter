/* Router Hooks */
Iron.Router.hooks.mustBeLoggedIn = function () {
	if (!Meteor.loggingIn()) {
		if (Meteor.userId()) {
			this.next();
		} else {
			Session.set("fromWhere", this.location.get().path);
			Router.go("/sign-in");
		}
	}
}

Iron.Router.hooks.alreadyLoggedIn = function () {
	if (Meteor.userId()) {
		Router.go("dashboard");
	} else {
		this.next();
	}
}

Router.onBeforeAction('alreadyLoggedIn', { only: [ 'signIn', 'createAccount' ] });
Router.onBeforeAction('mustBeLoggedIn', { except: [ 'home', 'signIn', 'signOut', 'createAccount' ] });


/* Templates */
Template._SignInForm.events({
	"submit #signInForm": function (e) {
		e.preventDefault();
		var t = Template.instance()
			, user = Utils.strings.trimInput(t.$("input[name=username]").val())
			, pass = Utils.strings.trimInput(t.$("input[name=password]").val());

		if ( !user ) {
			Growl.error("Please enter your username and password.", { title: "Ooops", parentSelector: ".login-messages" });
			return false;
		}

		Meteor.loginWithPassword(user, pass, function(err) {
			if (err) {
				Growl.error(err, { parentSelector: ".login-messages" });
				t.$("input[name=username]").focus();
			} else {
				var path = Session.get("fromWhere") || "/dashboard";
				Router.go(path);
			}
		});
		return false;
	}
});

Template._CreateNewAccountForm.events({
	"submit #createAccountForm": function (e) {
		e.preventDefault();
		var formObj = Utils.forms.sArrayToObject($(e.currentTarget).serializeArray());
		// console.log(formObj);

		Meteor.call("createAccount", formObj, function (err, result) {
			// console.log("err: ", err, " result: ", result);
			if (err) {
				Growl.error(err, { parentSelector: ".login-messages" });
			} else {
				Flash.success("Your account was created. You may log in now.");
				Router.go("/");
			}
		});
		return false;
	}
})
