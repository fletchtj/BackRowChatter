/*****************************************************************************/
/* Chatters Publish Functions
/*****************************************************************************/

Meteor.publish('chatters', function () {
  // you can remove this if you return a cursor
  return Chatters.find({}, { sort: { "created.on": -1 } });
});

Meteor.publish('chatter', function (chatterId) {
  // you can remove this if you return a cursor
  return Chatters.find(chatterId);
});