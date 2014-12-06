/*****************************************************************************/
/* LiveChatMessages Publish Functions
/*****************************************************************************/

Meteor.publish('liveChatMessages', function (chatterId) {
  var selector = { "chatterId": chatterId,  "status": { "$ne": "deleted" } };
  return LiveChatMessages.find(selector, { sort: { "created.on": 1 } });
});