/*****************************************************************************/
/* Questions Publish Functions
/*****************************************************************************/

Meteor.publish('questions', function (chatterId) {
  var selector = { "_id": chatterId, "status": { "$ne": "deleted" } }
   , chatter;
  
  if (!Roles.userIsInRole(this.userId, ["admin-role"])) {
  	_.extend(selector, { "users": this.userId });
  }
  
  chatter = Chatters.findOne(selector);

  if (chatter) {
  	return Questions.find({ "chatterId": chatterId, "status": { "$ne": "deleted" } }, { sort: { "created.on": -1 } });	
  } else {
  	return Questions.find(null);
  }
});

Meteor.publish('question', function (questionId) {
  var selector = { "_id": questionId, "status": { "$ne": "deleted" } }
  	, question = Questions.findOne(selector)
    , chatter;

  if (question && !Roles.userIsInRole(this.userId, ["admin-role"])) {
  	chatter = Chatters.findOne({ "_id": question.chatterId, "status": { "$ne": "deleted" }, "users": this.userId });
  	if (!chatter) {
  		selector = null;
  	}
  }
  
  return Questions.find(selector);
});