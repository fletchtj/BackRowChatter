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
			
			if ( n !== 1 ) {
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
};