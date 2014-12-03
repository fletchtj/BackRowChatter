Router.route('/sign-in', {name: 'signIn'});
Router.route('/sign-out', {
	name: 'signOut'
	, onBeforeAction: function () {
		Router.go("home");
		Meteor.logout(function () {
			delete Session.keys.fromWhere;			
		});
	}
});
Router.route('/create-account', {name: 'createAccount'});