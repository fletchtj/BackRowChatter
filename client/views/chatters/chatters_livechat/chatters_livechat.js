var scroller = function () {
  var pos = $(".livechat-message-list").prop("scrollHeight");
  $(".livechat-message-list").animate({scrollTop: pos}, 500, 'swing');
}

/*****************************************************************************/
/* _LiveChat: Event Handlers and Helpers .js*/
/*****************************************************************************/
Template._LiveChat.events({
  "submit #liveChatMessageForm": function (e) {
    e.preventDefault();
    // var _messages = messages.get();
    var message = {
      message: Utils.strings.trimInput($("#message").val())
      , created: { on: new Date().getTime(), by: Meteor.userId() }
      , chatterId: this.chatter._id
    };

    LiveChatMessages.insert(message, function (err, result) {
      if (err) {
        Growl.error(err);
      }
      $("#message").val("");
    });
  }
});

Template._LiveChat.helpers({

});

/*****************************************************************************/
/* _LiveChat: Lifecycle Hooks */
/*****************************************************************************/
Template._LiveChat.created = function () {
  var cursor = LiveChatMessages.find({chatterId: this.data.chatter._id});
  cursor.observeChanges({ added: scroller });
};

Template._LiveChat.rendered = function () {
    scroller();
};

Template._LiveChat.destroyed = function () {
};