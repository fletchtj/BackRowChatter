/*****************************************************************************/
/* Replies Methods */
/*****************************************************************************/

Meteor.methods({
  "/app/questions/add/reply": function (reply) {
    var loggedInUser = Meteor.user()
      , chatter = Chatters.findOne(reply.chatterId)
      , question = Questions.findOne(reply.questionId)
      , auditStamp = Utils.objects.generateAuditStamp()
      , result;
  
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ["admin-role", "student-role"])) {
      throw new Meteor.Error(403, "Access denied");
    }

    if (!chatter) {
      throw new Meteor.Error(500, "Unable to locate chatter.");
    }

    if (!question) {
      throw new Meteor.Error(500, "Unable to locate question.");
    }

    if (!reply.message) {
      throw new Meteor.Error(400, "Missing message text.");
    }

    reply = _.extend(_.pick(reply, "message"), {
      "chatterId": chatter._id
      , "questionId": question._id
      , "created": auditStamp
      , "lastModified": auditStamp
      , "isAnswer": false
      , "votes": []
      , "status": "active"
    });

    result = Replies.insert(reply);
    
    // if successful update question count on chatter
    if (result) {
      Questions.update(question._id, { "$set": { "lastReply": auditStamp }, "$inc": { "replyCount": 1 } });
    }

    return result;
  }
  , "/app/replies/vote": function (vote) {
    var loggedInUser = Meteor.user()
      , replyId = vote.replyId
      , reply = Replies.findOne(replyId)
      , result;

    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ["admin-role", "student-role"])) {
      throw new Meteor.Error(403, "Access denied");
    }

    if (!reply) {
      throw new Meteor.Error(500, "Unable to locate reply.");
    }

    // update reply votes
    if (_.findWhere(reply.votes, { userId: loggedInUser._id })) {
      // user has voted before...update vote count
      result = Replies.update(
        { _id: replyId, "votes.userId": loggedInUser._id }
        , {
          "$inc": { "votes.$.count": vote.count }
          , "$set": { "votes.$.lastModified": new Date().getTime() }
        }
      );
    } else {
      // user has not voted...push vote
      vote = _.extend(_.pick(vote, "count"), { "userId": loggedInUser._id, "lastModified": new Date().getTime() });
      result = Replies.update(replyId, { "$addToSet": { votes: vote } });
    }
    
    if (result) {
      // if user's have an allotted vote amount, update it...

    }

    return result;
  }
  , "app/replies/delete": function (replyId) {
    var loggedInUser = Meteor.user()
      , reply = Replies.findOne(replyId)
      , result;

    if (!loggedInUser || loggedInUser._id !== reply.created.by && !Roles.userIsInRole(loggedInUser, ["admin-role"])) {
      throw new Meteor.Error(403, "Access denied");
    }

    if (!reply) {
      throw new Meteor.Error(500, "Unable to locate reply.");
    }

    // remove question (soft delete)
    Replies.update(reply._id, { "$set": { "status": "deleted" }});

    // update question count on chatter
    Questions.update(reply.questionId, { "$inc": { "replyCount": -1 } });

    return true;
  }
});