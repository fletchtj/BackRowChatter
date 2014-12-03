var importResults = new ReactiveVar([]);

var parseComplete = function (results, file) {
	console.log(results.data);
	if (_.isEmpty(results.errors)) {
		results.data = _.map(results.data, function (row) {
			return _.object(_.map(row, function (cell, key) {
				return [Utils.strings.trimInput(key), Utils.strings.trimInput(cell)];
			}));
		});
		importResults.set(results.data);
	} else {
		console.log("ERROR! results:", results);
	}
}



/*****************************************************************************/
/* UsersImport: Event Handlers and Helpers .js*/
/*****************************************************************************/
Template.UsersImport.events({
	"submit #importUsersForm": function (e) {
		e.preventDefault();

		var formObj = Utils.forms.sArrayToObject($(e.currentTarget).serializeArray()) || {}
			, selectedFile = document.getElementById("localFile").files[0] || {}
			, csv = "text/csv" === selectedFile.type && selectedFile || formObj.csvString
			, message = "";
		
		if (csv) {
			Papa.parse(csv, { header: true, comments: "//", skipEmptyLines: true, complete: parseComplete });
		} else {
			message = !_.isEmpty(selectedFile) && !csv ? "Please select a file of type TEXT/CSV." : "Did you forget to add some CSV data? Try selecting a file, or pasting in some data.";
			Growl.error(message, { title: "Ooops...", parentSelector: "#importCSVStatusMessages" });
		}
		
		return false;
	}
	, "click #clearImportResults": function (e) {
		e.preventDefault();
		importResults.set([]);
	}
	, "click #saveImportResults": function (e) {
		e.preventDefault();
		var users = importResults.get();

		Meteor.call("/app/users/import", users, function (err, result) {
			if (err) {
				Growl.error(err.reason, { title: "Uh-oh...", parentSelector: "#importCSVStatusMessages" });
			} else {
				Flash.success("Successfully imported users.");
				Router.go("users.index");
			}
		});
	}
});

Template.UsersImport.helpers({
	fields: function () {
		var results = importResults.get()
			, keys;
		if (!_.isEmpty(results)) {
			keys = _.keys(results[0]);
		}
		return keys;
	}
	, previewUsers: function () {
		return importResults.get();
	}
});

/*****************************************************************************/
/* UsersImport: Lifecycle Hooks */
/*****************************************************************************/
Template.UsersImport.created = function () {
  // console.log(this.data);
};

Template.UsersImport.rendered = function () {
};

Template.UsersImport.destroyed = function () {
};