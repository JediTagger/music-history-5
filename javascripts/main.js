requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '../bower_components/firebase/firebase',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});

requirejs(
  ["jquery", "firebase", "hbs", "bootstrap", "dom-access", "populate-songs"],
  // run these dependencies first, then run the below code
  function($, fb, Handlebars, bootstrap, dom, pop) {
  	//this assigns the arguments to the above dependencies
    var myFirebaseRef = new Firebase("https://flickering-inferno-4277.firebaseio.com/");
    myFirebaseRef.on("value", function(snapshot) {

    	var showSongs = function(data) {
        require(['hbs!../templates/songs'], function(songTemplate) {
          dom.html(songTemplate(data));
        });
    	};
      showSongs(snapshot.val());

      var showArtists = function(data) {
        require(['hbs!../templates/artists'], function(artistTemplate) {
          $('#artists').append(artistTemplate(data));
        });
      };
      showArtists(snapshot.val());

      var showAlbums = function(data) {
        require(['hbs!../templates/albums'], function(albumTemplate) {
          $('#albums').append(albumTemplate(data));
        });
      };
      showAlbums(snapshot.val());
      
      var artistSelection = "";
      var albumSelection = "";

      $(document).on("click", "#artists li a", function() {
        artistSelection = $(this).text();
      });

      $(document).on("click", "#albums li a", function() {
        albumSelection = $(this).text();
      });

      $('#filter').click(function() {
        var filteredSongs = {};
        filteredSongs.songs = {};
        for(var i in snapshot.val().songs) {
          if (artistSelection === snapshot.val().songs[i].artist) {
            filteredSongs.songs[i] = snapshot.val().songs[i];
          }
        }
        showSongs(filteredSongs);
        $('.clear').show();
      });

      $('#clear').click(function() {
        showSongs(snapshot.val());
        $('.clear').hide();
      });

    });

  $(document).on("click", "#submit", function() {

    if($('#newSong').val() === "" || $('#newArtist').val() === "" || $('#newAlbum').val() === "") {

      $('.incomplete').show();

    }else{
      var newSong = {
        "name": $('#newSong').val(),
        "artist": $('#newArtist').val(),
        "album": $('#newAlbum').val()
      };

      $.ajax({
        url: "https://flickering-inferno-4277.firebaseio.com/songs.json",
        method: "POST",
        data: JSON.stringify(newSong)
      }).done(function(newSong) {
        $('.success').show();
        $('.incomplete').hide();
        $('#submit').hide();
        $('#another').show();
      });
    }
  });

  $(document).on("click", "#another", function() {
    location.reload(true);
  });

});