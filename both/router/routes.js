/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  waitOn: function () {
  	return Meteor.subscribe("allUsers");
  }
});

Router.route('/', {name: 'home'});
Router.route('/dashboard', {name: 'dashboard'});

Router.route('/chatters', {name: 'chatters.index'});
Router.route('/chatters/new', {name: 'chatters.create'});
Router.route('/chatters/:_id', {name: 'chatters.show'});
Router.route('/chatters/:_id/edit', {name: 'chatters.edit'});
Router.route('/chatters/:_id/delete', {name: 'chatters.delete'});
Router.route('/chatters/:chatterId/questions/:_id', {name: 'questions.show'});
Router.route('/chatters/:chatterId/questions/:_id/edit', {name: 'questions.edit'});
Router.route('/chatters/:chatterId/questions/:_id/delete', {name: 'questions.delete'});
Router.route('/chatters/:chatterId/questions/:questionId/replies/:_id/edit', {name: 'replies.edit'});
Router.route('/chatters/:chatterId/questions/:questionId/replies/:_id/delete', {name: 'replies.delete'});

Router.route('/users', {name: 'users.index'});
Router.route('/users/new', {name: 'users.create'});
Router.route('/users/:_id/edit', {name: 'users.edit'});
Router.route('/users/import', {name: 'users.import'});

Router.onBeforeAction('mustBeActiveUser', { except: [ 'home', 'dashboard', 'signIn', 'signOut', 'createAccount' ] });
Router.onBeforeAction('requireAdminRole', { only: [ 'chatters.create', 'chatters.edit', 'chatters.delete', 'users.index', 'users.create' ] });