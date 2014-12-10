if (Meteor.isClient) {

	Template.registerHelper("createdBy", function () {
		var userId = Meteor._get(this, "created", "by") || null
		return Utils.objects.userName(userId);
	});

	Template.registerHelper("createdOn", function (format, showDefaultText) {
		var datetime = Meteor._get(this, "created", "on");
		return Utils.dates.formatDate(datetime, format, showDefaultText);
	});

	Template.registerHelper("userName", function (userId) {
		return Utils.objects.userName(userId);
	});

	Template.registerHelper("formatDate", function (datetime, format, showDefaultText) {
		return Utils.dates.formatDate(datetime, format, showDefaultText);
	});

	Template.registerHelper("formatDuration", function (duration, format, showDefaultText) {
		return Utils.dates.formatDuration(duration, format, showDefaultText);
	});

	Template.registerHelper("formatString", function (text, format) {
		var _text = text;
		if (_text) {
			switch (format) {
				case "lowercase":
					_text = _text.toLowerCase();
					break;
				case "propercase":
					_text = Utils.strings.capitalize(_text.toLowerCase());
					break;
				case "uppercase":
					_text = _text.toUpperCase();
					break;
			}
		}
		return _text;
	});

	Template.registerHelper("pluralize", function(n, thing, plural) {
		plural = _.isString(plural) ? plural : null;
		return Utils.strings.pluralize(n, thing, plural);
	});
}