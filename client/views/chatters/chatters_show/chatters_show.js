/*****************************************************************************/
/* ChattersShow: Event Handlers and Helpers .js*/
/*****************************************************************************/
Template.ChattersShow.events({
  
});

Template.ChattersShow.helpers({
  chatterType: function () {
    var chatter = this.chatter || {}
      , templateName = "_" + chatter.type;
    return Template[templateName] && templateName || "NotFound";
  }
});

/*****************************************************************************/
/* ChattersShow: Lifecycle Hooks */
/*****************************************************************************/
Template.ChattersShow.created = function () {

};

Template.ChattersShow.rendered = function () {
};

Template.ChattersShow.destroyed = function () {
};