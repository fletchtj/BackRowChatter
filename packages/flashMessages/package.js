Package.describe({
  name: 'fletcher:flash-messages',
  version: "0.1.0",
  summary: 'Display temporary messages to the user following a redirection or route change.'
});

Package.onUse(function (api) {
  api.use(['mongo-livedata', 'minimongo', 'templating'], 'client');

  api.addFiles([
    'client/lib/flashMessages.js',
    'client/views/shared/flash_messages.html',
    'client/views/shared/flash_messages.js'
  ], 'client');
  
  api.export(['flashMessages', 'Flash'], 'client');
});

Package.onTest(function (api) {
  api.use('fletcher:flash-messages');
  api.use('tinytest');
  
  api.addFiles('flashMessages_tests.js');
});