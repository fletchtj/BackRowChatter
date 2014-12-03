/*****************************************************************************/
/* Chatters Methods */
/*****************************************************************************/

Meteor.methods({
  "/app/chatters/create": function (chatter) {
  	var loggedInUser = Meteor.user()
	  	, chatterId = chatter._id
      , auditStamp = Utils.objects.generateAuditStamp();
	
  	if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ["admin-role"])) {
  		throw new Meteor.Error(403, "Access denied");
  	}

  	if (["open", "closed", "archived"].indexOf(chatter.status) === -1) {
  		chatter.status = "closed";
  	}

  	// only take what we need...
  	chatter = _.pick(chatter, "topic", "status", "joinCode");

  	if (!chatterId) {
  		// brand new chatter...insert
  		_.extend(chatter, {
	  		"created": auditStamp
	  		, "lastModified": auditStamp
	  		, "users": []
	  		, "questionCount": 0
        , "lastReply": null
	  	});
	  	
  		return Chatters.insert(chatter);

  	} else {
  		// existing chatter...update
  		_.extend(chatter, {
  			"lastModified": auditStamp
  		});
  		
  		return Chatters.update(chatterId, { "$set": chatter });
      
  	}
  }
  , "app/chatters/delete": function (chatterId) {
    var loggedInUser = Meteor.user();
  
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ["admin-role"])) {
      throw new Meteor.Error(403, "Access denied");
    }

    // remove chatter topic (soft delete)
    Chatters.update(chatterId, { "$set": { "status": "deleted" } });

    // set status to 'deleted' for all questions and replies in chatter topic
    Questions.update({ "chatterId": chatterId }, { "$set": { "status": "deleted" } }, { "multi": true });
    Replies.update({ "chatterId": chatterId }, { "$set": { "status": "deleted" } }, { "multi": true });

    // TODO: return votes to users if that's implemented

    return true;
  }
  , "/app/chatters/join": function (joinCode) {
    var loggedInUser = Meteor.user();
  
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ["student-role"])) {
      throw new Meteor.Error(403, "Access denied");
    }

    if (!joinCode) {
      throw new Meteor.Error(400, "Missing join code");
    }

    return Chatters.update(
      { "joinCode": joinCode, "status": { "$nin": [ "deleted", "archived" ] } }
      , { "$addToSet": { "users": loggedInUser._id } }
    );
  }
});