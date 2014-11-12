/*****************************************************************************/
/* QuestionsShow: Event Handlers and Helpers .js*/
/*****************************************************************************/
Template.QuestionsShow.events({
  "submit #newReply": function (e, tmpl) {
    e.preventDefault();

    var reply = Utils.forms.sArrayToObject($(e.currentTarget).serializeArray())
      , chatter = Meteor._get(tmpl, "data", "chatter")
      , question = Meteor._get(tmpl, "data", "question");
    
    if (reply.message) {
      reply.chatterId = chatter._id;
      reply.questionId = question._id;
      Meteor.call("/app/questions/add/reply", reply, function (err, result) {
        if (err) {
          Growl.error(err);
        } else {
          $(e.currentTarget)[0].reset();
          $("textarea").select().focus();
        }
      });
    } else {
      Growl.error("Please add some text and try again.", { title: "Doh?!" });
    }
    return false;
  }
});

Template.QuestionsShow.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* QuestionsShow: Lifecycle Hooks */
/*****************************************************************************/
Template.QuestionsShow.created = function () {
};

Template.QuestionsShow.rendered = function () {
};

Template.QuestionsShow.destroyed = function () {
};