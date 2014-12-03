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
};

_.each(App.helpers, function (helper, key) {
  Template.registerHelper(key, helper);
});