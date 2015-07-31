define(function() {
	$(document).on("click", "#more", function() {
		$.ajax({
			url: "second.json"
		}).done(function(data) {
			for (var i = 0; i < data.songs.length; i++) {
				var nextSong = "<div id=\"song\"" + data.songs[i] 
					+ ">" + data.songs[i].name + " by " 
					+ data.songs[i].artist + " on the album " 
					+ data.songs[i].album + "<button id=\"rmv\">Remove</button></div>";
				$('#songList').prepend(nextSong);
			}
		});
	});
	$(document).on("click", "#rmv", function() {
		$(this).parent().remove();
	});
});