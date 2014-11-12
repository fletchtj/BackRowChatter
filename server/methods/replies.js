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
    });

    result = Replies.insert(reply);
    
    // if successful update question count on chatter
    if (result) {
      Questions.update(question._id, { "$set": { "lastReply": auditStamp }, "$inc": { "replyCount": 1 } });
    }

    return result;
  }
});