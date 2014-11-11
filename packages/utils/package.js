Package.describe({
  name: 'fletcher:utils',
  version: '0.1.0',
  summary: 'A set of utility methods.'
});

Package.onUse(function (api) {
  api.use('underscore', ['client', 'server']);
  
  api.use('templating', 'client');

  api.addFiles('utils.js', ['client', 'server']);
  api.addFiles('template_helpers.js', 'client');

  api.export('Utils');
});

Package.onTest(function (api) {
  api.use('fletcher:utils');
  api.use('tinytest');
  
  api.addFiles('utils_tests.js');
});