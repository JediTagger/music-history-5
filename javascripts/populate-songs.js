define(function() {
	$.ajax({
		url: "main.json"
	}).done(function(data) {
		for (var i = 0; i < data.songs.length; i++) {
			var nextSong = "<div id=\"song\"" + data.songs[i] 
				+ ">" + data.songs[i].name + " by " 
				+ data.songs[i].artist + " on the album " 
				+ data.songs[i].album + "<button id=\"rmv\">Remove</button></div>";
			$('#songList').prepend(nextSong);
		}
		$('#songList').append("<button id=\"more\">More ></button>");
		$(document).on("click", "#rmv", function() {
			$(this).parent().remove();
		});
	});
});