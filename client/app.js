/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/
_.extend(App, {
});

App.helpers = {
	voteCount: function () {
		return _.reduce(this.votes, function (memo, vote) {
	      return memo + vote.count;
	    }, 0);
	}
	, chatterOpen: function () {
	    return "open" === this.chatter.status;
	}
};

_.each(App.helpers, function (helper, key) {
  Template.registerHelper(key, helper);
});