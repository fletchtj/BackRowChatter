if (Meteor.isClient) {
	var DateFormats = {
		"short": "MMM DD, YYYY",
		"shortdt": "MMM, DD @ h:mm a",
		"medium": "dddd DD.MM.YYYY HH:mm",
		"long": "dddd, MMMM DD @ h:mm a",
		"abbr": "ddd, MMM D, YYYY",
		"datepicker": "MM/DD/YYYY",
		"military": "HH:mm"
	}

	Template.registerHelper("createdBy", function () {
		var _userId = Meteor._get(this, "created", "by") || null
			, user = Meteor.users.findOne(_userId)
			, name;
		if (user) {
			name = user.profile.name;
		} else {
			name = "Unknown User";
		}
		return name;
	});

	Template.registerHelper("createdOn", function (format, showDefaultText) {
		var datetime = Meteor._get(this, "created", "on")
			, d = new Date(datetime)
			, _dateString
			, format = format || "long";

		showDefaultText = _.isBoolean(showDefaultText) ? showDefaultText : false;
		
		if (!datetime) {
			return showDefaultText && "Not specified" || "";
		}
		
		if (Package["mrt:moment"]) {
			if (format === "relative") {
				_dateString = moment(d).fromNow();
			} else {
				var f = DateFormats[format];
				_dateString = moment(d).format(f);
			}
		} else {
			// return basic mm/dd/yyyy format if momentjs not found
			_dateString = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
		}
		return _dateString;
	});

	Template.registerHelper("formatDate", function (datetime, format, showDefaultText) {
		// console.log(datetime, format);
		showDefaultText = _.isBoolean(showDefaultText) ? showDefaultText : false;
		if (!datetime) {
			return showDefaultText && "Not specified" || "";
		}
		var d = new Date(datetime);
		var _dateString;
		if (Package["mrt:moment"]) {
			if (format === "relative") {
				_dateString = moment(d).fromNow();
			} else {
				var f = DateFormats[format];
				_dateString = moment(d).format(f);
			}
		} else {
			// return basic mm/dd/yyyy format if momentjs not found
			_dateString = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
		}
		return _dateString;
	});

	Template.registerHelper("formatDuration", function (duration, format, showDefaultText) {
		showDefaultText = _.isBoolean(showDefaultText) ? showDefaultText : false;
		if (!duration) {
			return showDefaultText && "Not specified" || "";
		}

		// set default return value
		var _dur = duration / (1000 * 3600 * 24) + " days";

		if (Package["mrt:moment"]) {
			switch (format) {
				case "human":
					_dur = moment.duration(duration).humanize();
					break;
				case "days":
					_dur = +moment.duration(duration).asDays().toFixed(0);
					_dur = pluralize(_dur, "day");
					break;
				case "weeks":
					_dur = +moment.duration(duration).asWeeks().toFixed(1);
					_dur = pluralize(_dur, "week");
					break;
				default:
					_dur = moment.duration(duration).humanize();
			}
		}
		return _dur;
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

	Template.registerHelper("userName", function (userId) {
		var _userId = userId || Meteor.userId()
			, user = Meteor.users.findOne(_userId)
			, name;
		if (user) {
			name = user.profile.name;
		} else {
			name = "Unknown User";
		}
		return name;
	});

	Template.registerHelper("pluralize", function(n, thing, plural) {
		plural = _.isString(plural) ? plural : null;
		return Utils.strings.pluralize(n, thing, plural);
	});
}