/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {name: 'home'});

Router.route('/chatters', {name: 'chatters.index'});
Router.route('/chatters/new', {name: 'chatters.create'});
Router.route('/chatters/:_id/edit', {name: 'chatters.edit'});
Router.route('/chatters/:_id', {name: 'chatters.show'});
