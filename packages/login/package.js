Package.describe({
  name: 'fletcher:login',
  version: '0.1.0',
  summary: 'A set of templates and routes for account creation and entry.'
});

Package.onUse(function (api) {
  api.use(['iron:router', 'fletcher:utils', 'accounts-password'], ['client', 'server']);
  api.use(['fletcher:flash-messages', 'fletcher:growl', 'templating', 'session'], 'client');
  
  api.addFiles('both/routes.js', ['client', 'server']);
  api.addFiles(['client/templates.css', 'client/templates.html', 'client/templates.js'], 'client');
  api.addFiles('server/methods.js', 'server');
  
});

Package.onTest(function (api) {
  api.use('fletcher:login');
  api.use('tinytest');
  
  api.addFiles('login_tests.js');
});