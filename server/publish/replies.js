/*****************************************************************************/
/* Replies Publish Functions
/*****************************************************************************/

Meteor.publish('replies', function (chatterId, questionId) {
  return Replies.find({ "chatterId": chatterId, "questionId": questionId }, { sort: { "created.on": 1 } });
});