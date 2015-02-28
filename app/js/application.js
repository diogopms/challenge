window.Application = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  init: function () {
    new Application.Routers.SimpleRouter();
    Backbone.history.start();

    React.render(new Phone(), document.getElementById('phone'));
  }
}

$(document).ready(function () {
  Application.init();
});

