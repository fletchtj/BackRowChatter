ChattersCreateController = RouteController.extend({
  waitOn: function () {
  },

  data: function () {
  	return { chatter: {} };
  },

  action: function () {
    this.render();
  }
});