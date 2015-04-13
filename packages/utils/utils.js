var DateFormats = {
	"short": "MMM DD, YYYY",
	"shortdt": "MMM, DD @ h:mm a",
	"medium": "dddd DD.MM.YYYY HH:mm",
	"long": "dddd, MMMM DD @ h:mm a",
	"abbr": "ddd, MMM D, YYYY",
	"datepicker": "MM/DD/YYYY",
	"military": "HH:mm"
};

Utils = {
	strings: {
		capitalize: function (s) {
			return s.charAt(0).toUpperCase() + s.slice(1);
		}
		, stripHTML: function (s) {
			return s.replace(/<(?:.|\n)*?>/gm, '');
		}
		, stripCRLF: function (s) {
			return s.replace(/\r?\n|\r/gm, " ");
		}
		, trimWords: function(s, numWords) {
			expString = s.split(/\s+/, numWords);
			if(expString.length >= numWords)
				return expString.join(" ")+"…";
			return s;
		}
		, trimInput: function(s) {
			return s && s.replace(/^\s*|\s*$/g, "") || "";
		}
		, pluralize: function(n, thing, plural) {
			// fairly stupid pluralizer
			var n = parseInt(n) || 0
				, result = n + " " + thing;
			
			if (n !== 1) {
				if (plural) {
					result = n + " " + plural;
				} else {
					result += "s";
				}
			}
			return result;
		}
		, slugify: function(s) {
			s = s.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
			s = s.replace(/-/gi, "_");
			s = s.replace(/\s/gi, "-");
			s = s.toLowerCase();
			return s;
		}
	}
	, forms: {
		sArrayToObject: function (sArray) {
			var o = {};
			_.each(sArray, function (a) {
				if (o[a.name] !== undefined) {
					if (!o[a.name].push) {
						o[a.name] = [o[a.name]];
					}
					o[a.name].push( Utils.strings.trimInput( a.value ) || "" );
				} else {
					o[a.name] = Utils.strings.trimInput( a.value ) || "";
				}
			});
			return o;
		}
	}
	, dates: {
		formatDate: function (ts, format, showDefaultText) {
			var d = new Date(ts)
				, _dateString
				, format = format || "long";

			showDefaultText = _.isBoolean(showDefaultText) ? showDefaultText : false;
			
			if (!ts) {
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
		}
		, formatDuration: function (duration, format, showDefaultText) {
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
		}
	}
	, objects: {
		userName: function (userId) {
			var user = Meteor.users.findOne(userId)
				, name;
			if (user) {
				name = user.profile.name || user.username;
			} else {
				name = "Unknown User";
			}
			return name;
		}
		, generateAuditStamp: function () {
			// used for 'created' and 'lastModified'...
			return { "on": new Date().getTime(), "by": Meteor.userId() }
		}
	}
};