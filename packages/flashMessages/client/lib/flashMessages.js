flashMessages = new Mongo.Collection(null);

Flash = {
	warning: function (message, options) {
		createMessage(message, "alert-warning", options);
	}
	, error: function (message, options) {
		createMessage(message, "alert-danger", options);
	}
	, success: function (message, options) {
		createMessage(message, "alert-success", options);
	}
	, info: function (message, options) {
		createMessage(message, "alert-info", options);
	}
	, clear: function () {
		flashMessages.remove({seen: true});
	}
	, configure: function (options) {
		this.options = this.options || {};
		_.extend(this.options, options);
	}
	, options: {
		sticky: false
		, hideDelay: 4000
		, scrollToTop: true
		, title: ""
	}
};

createMessage = function (message, styleClass, options) {
	options = options || {};
	options.sticky = options.sticky === undefined ? Flash.options.sticky : options.sticky;
	options.hideDelay = options.hideDelay || Flash.options.hideDelay;
	flashMessages.insert({message: message, styleClass: styleClass, seen: false, options: options});
};