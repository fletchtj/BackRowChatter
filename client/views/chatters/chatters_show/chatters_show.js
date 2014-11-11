/*****************************************************************************/
/* ChattersShow: Event Handlers and Helpers .js*/
/*****************************************************************************/
Template.ChattersShow.events({
  "submit #newQuestion": function (e, tmpl) {
    e.preventDefault();

    var question = Utils.forms.sArrayToObject($(e.currentTarget).serializeArray())
      , chatter = tmpl.data && tmpl.data.chatter;
    
    if (!chatter) {
      Growl.error("Could not find chatter.");
      return;
    }

    if (question.message) {
      question.chatterId = chatter._id;
      Meteor.call("/app/chatters/add/question", question, function (err, result) {
        if (err) {
          Growl.error(err);
        } else {
          $(e.currentTarget)[0].reset();
        }
      });
    } else {
      Growl.error("Please add some text and try again.", { title: "Doh?!" });
    }
    return false;
  }
});

Template.ChattersShow.helpers({
  //
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