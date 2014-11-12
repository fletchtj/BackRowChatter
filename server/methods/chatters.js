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
  	chatter = _.pick(chatter, "name", "status", "joinCode");

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
});