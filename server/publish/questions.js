/*****************************************************************************/
/* Questions Publish Functions
/*****************************************************************************/

Meteor.publish('questions', function (chatterId) {
  return Questions.find({ "chatterId": chatterId }, { sort: { "created.on": -1 } });
});

Meteor.publish('question', function (questionId) {
  return Questions.find(questionId);
});