/*****************************************************************************/
/* Replies Publish Functions
/*****************************************************************************/

Meteor.publish('replies', function (chatterId, questionId) {
  var selector = { "chatterId": chatterId, "questionId": questionId, "status": { "$ne": "deleted" } }
    , question = Questions.findOne({ "_id": questionId, "status": { "$ne": "deleted" } })
    , chatter;

  if (!question) {
  	selector = null;
  } else if (!Roles.userIsInRole(this.userId, ["admin-role"])) {
  	chatter = Chatters.findOne({ "_id": chatterId, "status": { "$ne": "deleted" }, "users": this.userId });
  	if (!chatter) {
  		selector = null;
  	}
  }
  return Replies.find(selector, { sort: { "created.on": 1 } });
});

Meteor.publish('reply', function (replyId) {
  var selector = { "_id": replyId, "status": { "$ne": "deleted" } }
    , reply = Replies.findOne(selector)
    , chatter;

  if (!reply) {
  	selector = null;
  } else if (!Roles.userIsInRole(this.userId, ["admin-role"])) {
  	chatter = Chatters.findOne({ "_id": reply.chatterId, "status": { "$ne": "deleted" }, "users": this.userId });
  	if (!chatter) {
  		selector = null;
  	}
  }
  return Replies.find(selector);
});