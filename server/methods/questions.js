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
    });

    result = Questions.insert(question);
    
    // if successful update question count on chatter
    if (result) {
      Chatters.update(chatter._id, { "$inc": { "questionCount": 1 } });  
    }

    return result;
  }
});