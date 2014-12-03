/*****************************************************************************/
/* RepliesEdit: Event Handlers and Helpers .js*/
/*****************************************************************************/
Template.RepliesEdit.events({
  "submit #replyForm": function (e, tmpl) {
    e.preventDefault();

    var reply = Utils.forms.sArrayToObject($(e.currentTarget).serializeArray());
    
    if (!reply.message) {
      Growl.error("Please add some text and try again.", { title: "Doh?!" });
      return false;
    }

    if (reply.message !== this.message) {
      Replies.update(this._id, { "$set": { "message": reply.message } }, function (err, result) {
        if (err) {
          Growl.error(err);
        } else {
          Flash.success("The reply was saved.")
          history.back();
        }
      });
    } else {
      history.back();
    }
    return false;
  }
  , "click .cancel": function (e) {
    e.preventDefault();
    history.back();
  }
});

Template.RepliesEdit.helpers({

});

/*****************************************************************************/
/* RepliesEdit: Lifecycle Hooks */
/*****************************************************************************/
Template.RepliesEdit.created = function () {
};

Template.RepliesEdit.rendered = function () {
};

Template.RepliesEdit.destroyed = function () {
};