/*****************************************************************************/
/* Questions Methods */
/*****************************************************************************/

Meteor.methods({
  "/app/chatters/add/question": function (question) {
    var loggedInUser = Meteor.user()
      , chatter = Chatters.findOne(question.chatterId)
      , auditStamp = Utils.objects.generateAuditStamp()
      , result;
  
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ["admin-role", "student-role"])) {
      throw new Meteor.Error(403, "Access denied");
    }

    if (!chatter) {
      throw new Meteor.Error(500, "Unable to locate chatter.");
    }

    if (!question.message) {
      throw new Meteor.Error(400, "Missing message text.");
    }

    question = _.extend(_.pick(question, "message"), {
      "chatterId": chatter._id
      , "created": auditStamp
      , "lastModified": auditStamp
      , "replyCount": 0
      , "hasAnswer": false
      , "votes": []
      , "status": "active"
    });

    result = Questions.insert(question);
    
    // if successful update question count on chatter
    if (result) {
      Chatters.update(chatter._id, { "$inc": { "questionCount": 1 } });  
    }

    return result;
  }
  , "/app/questions/vote": function (vote) {
    var loggedInUser = Meteor.user()
      , questionId = vote.questionId
      , question = Questions.findOne(questionId)
      , result;

    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ["admin-role", "student-role"])) {
      throw new Meteor.Error(403, "Access denied");
    }

    if (!question) {
      throw new Meteor.Error(500, "Unable to locate question.");
    }

    // update question votes
    if (_.findWhere(question.votes, { userId: loggedInUser._id })) {
      // user has voted before...update vote count
      result = Questions.update(
        { _id: questionId, "votes.userId": loggedInUser._id }
        , {
          "$inc": { "votes.$.count": vote.count }
          , "$set": { "votes.$.lastModified": new Date().getTime() }
        }
      );
    } else {
      // user has not voted...push vote
      vote = _.extend(_.pick(vote, "count"), { "userId": loggedInUser._id, "lastModified": new Date().getTime() });
      result = Questions.update(questionId, { "$addToSet": { votes: vote } });
    }
    
    if (result) {
      // if user's have an allotted vote amount, update it...

    }

    return result;
  }
  , "/app/questions/acceptAnswer": function (questionId, replyId) {
    var loggedInUser = Meteor.user()
      , question = Questions.findOne(questionId)
      , reply = Replies.findOne(replyId)
      , result;

    if (!loggedInUser || loggedInUser._id !== question.created.by && !Roles.userIsInRole(loggedInUser, ["admin-role", "student-role"])) {
      throw new Meteor.Error(403, "Access denied");
    }

    if (!reply) {
      throw new Meteor.Error(500, "Unable to locate reply.");
    }

    // update question replies
    Replies.update({ "questionId": questionId, "isAnswer": true }, { "$set": { "isAnswer": false } });
    Replies.update(replyId, { "$set": { "isAnswer": true } });
    
    // update question
    result = Questions.update(questionId, { "$set": { "hasAnswer": true } });

    return result;
  }
  , "app/questions/delete": function (questionId) {
    var loggedInUser = Meteor.user()
      , question = Questions.findOne(questionId)
      , result;

    if (!loggedInUser || loggedInUser._id !== question.created.by && !Roles.userIsInRole(loggedInUser, ["admin-role"])) {
      throw new Meteor.Error(403, "Access denied");
    }

    if (!question) {
      throw new Meteor.Error(500, "Unable to locate question.");
    }

    // remove question (soft delete)
    Questions.update(question._id, { "$set": { "status": "deleted" }});

    // remove replies to question (soft delete)
    Replies.update({ "questionId": question._id }, { "$set": { "status": "deleted" } }, { "multi": true });

    // update question count on chatter
    Chatters.update(question.chatterId, { "$inc": { "questionCount": -1 } });

    return true;
  }
});