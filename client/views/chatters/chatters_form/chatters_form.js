/*****************************************************************************/
/* ChattersForm: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.ChattersForm.events({
  "click button[data-action=generateJoinCode]": function (e, tmpl) {
    e.preventDefault();
    var joinCode = Random.id(6);
    tmpl.find("input[name=joinCode]").value = joinCode;
    return false;
  }
  , "submit #chatter": function (e) {
    e.preventDefault();
    var chatter = Utils.forms.sArrayToObject($(e.currentTarget).serializeArray());
    
    if (this._id) {
      _.extend(chatter, { _id: this._id });
    }

    if (chatter.name) {
      Meteor.call("/app/chatters/create", chatter, function (err, result) {
        if (err) {
          Growl.error(err);
        } else {
          Router.go("chatters.index");
        }
      });  
    } else {
      Growl.error("Give your chatter a name, and try again.", { title: "Oops..."});
    }
    
    return false;
  }
});

Template.ChattersForm.helpers({
  statusAttrs: function () {
    var chatter = Router.current().data().chatter
      , attrs = {
        name: "status"
        , value: this.val
      };

    if (chatter.status && this.val === chatter.status || this.defaultChecked) {
      attrs.checked = true;
    }

    return attrs;
  }
});

/*****************************************************************************/
/* ChattersForm: Lifecycle Hooks */
/*****************************************************************************/
Template.ChattersForm.created = function () {
  // possible status values for a chatter...
  var statusVals = [
    { label: "Open", val: "open", defaultChecked: true }
    , { label: "Closed", val: "closed", defaultChecked: false }
  ];

  if (Meteor._get(this, "data", "_id")) {
    // editing a chatter...
    // add the "archived" option now that the chatter exists.
    statusVals.push({ label: "Archived", val: "archived", defaultChecked: false });
  } else {
    // creating a new chatter...
    // auto-generate a new join code, so it pre-populates
    _.extend(this.data, { joinCode: Random.id(6) } );
  }
  _.extend(this.data, { statusVals: statusVals });
};

Template.ChattersForm.rendered = function () {
};

Template.ChattersForm.destroyed = function () {
};