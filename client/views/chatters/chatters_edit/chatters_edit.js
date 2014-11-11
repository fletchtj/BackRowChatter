/*****************************************************************************/
/* ChattersEdit: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.ChattersEdit.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.ChattersEdit.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* ChattersEdit: Lifecycle Hooks */
/*****************************************************************************/
Template.ChattersEdit.created = function () {
  console.log("editing...", this.data);
};

Template.ChattersEdit.rendered = function () {
};

Template.ChattersEdit.destroyed = function () {
};