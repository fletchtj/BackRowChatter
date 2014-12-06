/*****************************************************************************/
/* UsersIndex: Event Handlers and Helpers .js*/
/*****************************************************************************/
Template.UsersIndex.events({
	"change #cBoxToggle": function (e) {
		$("input[name=user]").prop("checked", e.currentTarget.checked);
	}
	, "change input[name=user]": function (e) {
		var cBoxes = $("input[name=user]")
			, checked = cBoxes.filter(":checked")
			, toggle = $("#cBoxToggle");

		// console.log(cBoxes.length, checked.length);
		if (cBoxes.length === checked.length) {
			// console.log("all checkboxes are checked...");
			toggle.prop("checked", true);
			toggle.prop("indeterminate", false);
		} else if (checked.length > 0) {
			// console.log("some checkboxes are checked...");
			toggle.prop("indeterminate", true);
		} else {
			// console.log("no checkboxes are checked...");
			toggle.prop("checked", false);
			toggle.prop("indeterminate", false);
		}
	}
	, "submit #filterUsersForm": function (e) {
		e.preventDefault();
		var formObj = Utils.forms.sArrayToObject($(e.currentTarget).serializeArray())
			, filter = {};
		// create filter
		console.log(formObj);
		if (formObj.filterField) {
			filter[formObj.filterField.toLowerCase()] = { "$regex": formObj.filterVal, "$options": "gi" };	
		}
		
		// set Session variable
		Session.set("filter.users", filter);
	}
	, "click #resetUsersFilter": function (e) {
		e.preventDefault();
		Session.set("filter.users", {});
		$("#filterUsersForm")[0].reset();
	}
	, "click #approveSelectedUsers": function (e) {
		e.preventDefault();
		var selectedUsers = _.map($("input[name=user]:checked"), function (user) {
			return user.value;
		});
		selectedUsers = _.without(selectedUsers, Meteor.userId());
		
		Meteor.call("/app/users/saveStatus", selectedUsers, "active", function (err, result) {
			if (err) {
				Growl.error(err);
			} else {
				Growl.success(result + " users were updated", { title: "Success"});
				$("input[name=user]").prop("checked", false);
			}
		});
	}
	, "click #disableSelectedUsers": function (e) {
		e.preventDefault();
		var selectedUsers = _.map($("input[name=user]:checked"), function (user) {
			return user.value;
		});
		selectedUsers = _.without(selectedUsers, Meteor.userId());
	
		Meteor.call("/app/users/saveStatus", selectedUsers, "disabled", function (err, result) {
			if (err) {
				Growl.error(err);
			} else {
				Growl.success(result + " users were updated", { title: "Success"});
				$("input[name=user]").prop("checked", false);
			}
		});
	}
});

Template.UsersIndex.helpers({
  users: function () {
  	var filter = Session.get("filter.users") || {};
  	return Meteor.users.find(filter, { sort: { username: 1 }});
  }
});

/*****************************************************************************/
/* UsersIndex: Lifecycle Hooks */
/*****************************************************************************/
Template.UsersIndex.created = function () {
};

Template.UsersIndex.rendered = function () {
};

Template.UsersIndex.destroyed = function () {
};