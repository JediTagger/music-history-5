define(["jquery"],function($) {
  return {
    popSongs: function(callback) {
      $.ajax({
        url: "https://flickering-inferno-4277.firebaseio.com/.json"
      }).done(function(data) {
        callback.call(this, data);
      });
    }
  };
});

//this is a function that returns an object.  It has one key/value pair.
//the key is popSongs and the value is a funciton that takes one argument.
//the function gets the data from main.json and calls the function given
//as the argument on the .songs of the data.