define(["jquery"],function($) {
  return {
    popArtists: function(callback) {
      $.ajax({
        url: "https://flickering-inferno-4277.firebaseio.com/.json"
      }).done(function(data) {
        callback.call(this, data);
      });
    }
  };
});