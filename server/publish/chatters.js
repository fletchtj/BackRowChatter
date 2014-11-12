/*****************************************************************************/
/* Chatters Publish Functions
/*****************************************************************************/

Meteor.publish('chatters', function () {
  return Chatters.find({}, { sort: { "created.on": -1 } });
});

Meteor.publish('chatter', function (chatterId) {
  return Chatters.find(chatterId);
});