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

        console.log(snapshot.val().songs[0].artist);

        $('#filter').click(function() {
        var filteredSongs = [];
        for(artistSelection in snapshot.val()) {
          if (artistSelection === snapshot.val().songs[0].artist) {
            filteredSongs.push(snapshot.val().songs[0]);
          };
        };
        showSongs(filteredSongs);
      });
    });

  $(document).on("click", "#submit", function() {
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
      console.log("post initiated");
    });
  });

  $(document).on("click", "#artists li a", function() {
    var artistSelection = $(this).text();
  });

  $(document).on("click", "#albums li a", function() {
    var albumSelection = $(this).text();
  });

});

    //obsolete remove and more buttons
    // $(document).on("click", "#rmv", function() {
    //  $(this).parent().remove();

    // dom.append("<button id=\"more\">More ></button>");

    // $(document).on("click", "#more", function() {
    //  more.moreSongs(showSongs);