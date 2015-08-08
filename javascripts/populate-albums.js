define(["jquery"],function($) {
  return {
    popAlbums: function(callback) {
      $.ajax({
        url: "https://flickering-inferno-4277.firebaseio.com/.json"
      }).done(function(data) {
        callback.call(this, data);
      });
    }
  };
});