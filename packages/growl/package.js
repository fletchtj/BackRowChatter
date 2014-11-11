Package.describe({
  name: 'fletcher:growl',
  version: '0.1.0',
  summary: 'Growl messages'
});

Package.onUse(function (api) {
  api.use('underscore', 'client');
  
  api.addFiles('growl.js', 'client');

  api.export('Growl', 'client');
});

Package.onTest(function (api) {
  api.use('fletcher:growl');
  api.use('tinytest');
  
  api.addFiles('growl_tests.js');
});