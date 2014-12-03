/*****************************************************************************/
/* QuestionsEdit: Event Handlers and Helpers .js*/
/*****************************************************************************/
Template.QuestionsEdit.events({
  "submit #questionForm": function (e, tmpl) {
    e.preventDefault();

    var question = Utils.forms.sArrayToObject($(e.currentTarget).serializeArray());
    
    if (!question.message) {
      Growl.error("Please add some text and try again.", { title: "Doh?!" });
      return false;
    }

    if (question.message !== this.message) {
      Questions.update(this._id, { "$set": { "message": question.message } }, function (err, result) {
        if (err) {
          Growl.error(err);
        } else {
          Flash.success("The question was saved.")
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

Template.QuestionsEdit.helpers({

});

/*****************************************************************************/
/* QuestionsEdit: Lifecycle Hooks */
/*****************************************************************************/
Template.QuestionsEdit.created = function () {
};

Template.QuestionsEdit.rendered = function () {
};

Template.QuestionsEdit.destroyed = function () {
};