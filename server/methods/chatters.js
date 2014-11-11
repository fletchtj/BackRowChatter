/*****************************************************************************/
/* Chatters Methods */
/*****************************************************************************/
var generateUserDate = function () {
  // used for 'created' and 'lastModified'...
  return { "on": new Date().getTime(), "by": Meteor.userId() }
}

Meteor.methods({
  "/app/chatters/create": function (chatter) {
  	var loggedInUser = Meteor.user()
	  	, chatterId = chatter._id
      , userDate = generateUserDate();
	
  	if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ["admin-role"])) {
  		throw new Meteor.Error(403, "Access denied");
  	}

  	if (["open", "closed", "archived"].indexOf(chatter.status) === -1) {
  		chatter.status = "closed";
  	}

  	// only take what we need...
  	chatter = _.pick(chatter, "name", "status", "joinCode");

  	if (!chatterId) {
  		// brand new chatter...insert
  		_.extend(chatter, {
	  		"created": userDate
	  		, "lastModified": userDate
	  		, "users": []
	  		, "questions": []
	  	});
	  	
  		return Chatters.insert(chatter);
  	} else {
  		// existing chatter...update
  		_.extend(chatter, {
  			"lastModified": userDate
  		});
  		
  		return Chatters.update(chatterId, { "$set": chatter });
  	}
  }
  , "/app/chatters/add/question": function (question) {
    var loggedInUser = Meteor.user()
      , chatterId = question.chatterId
      , userDate = generateUserDate();
  
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ["admin-role", "student-role"])) {
      throw new Meteor.Error(403, "Access denied");
    }

    if (!question.message) {
      throw new Meteor.Error(400, "Missing message text.");
    }

    question = _.extend(_.pick(question, "message"), {
      "created": userDate
      , "lastModified": userDate
      , "replies": []
      , "votes": []
    });

    return Chatters.update(chatterId, { "$addToSet": { "questions": question } });
  }
});