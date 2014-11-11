/*****************************************************************************/
/* FlashMessages: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.FlashMessages.helpers({
  messages: function () {
    if (flashMessages.find().count() && Flash.options.scrollToTop) {
      $("html, body").animate({
        scrollTop: 0
      }, 200);
    }
    var messages = flashMessages.find().fetch();
    _.each(messages, function (value, index) {
      value.group = value.message instanceof Array;
    });
    return messages;
  }
});

/*****************************************************************************/
/* FlashMessages: Event Handlers and Helpersss .js*/
/*****************************************************************************/

Template.FlashMessage.events({
  "click .close": function (e) {
    e.preventDefault();
    flashMessages.remove(this._id);
  }
});

/*****************************************************************************/
/* FlashMessage: Lifecycle Hooks */
/*****************************************************************************/
Template.FlashMessage.rendered = function () {
  var message = this.data;
  Meteor.defer(function () {
    flashMessages.update(message._id, { "$set": { seen: true } });
  });
  if (message.options && !message.options.sticky) {
    $alert = this.$(".alert");
    Meteor.setTimeout(function () {
      $alert.fadeOut(400, function () {
        flashMessages.remove(message._id);
      });
    }, message.options.hideDelay);
  }
};