(function () {
	document.addEventListener('DOMContentLoaded', () => {
		var connection = new signalR.HubConnectionBuilder().withUrl("http://esnsonus.be/Sonus").build()
		// var connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:44349/Sonus").build()
		DataAccess.startConnection(connection)
		DataAccess.receiveServerHostMessage(connection)
		DataAccess.receiveServerClientMessage(connection)
		DataAccess.receiveServerNewParticipantMessage(connection)
		DataAccess.receiveServerSongAdded(connection)

		SonusUI.AppSetup({
			ContainerClass: '.js-container',
			PlaylistClass: '.js-playlist',
			KaraokeClass: '.js-karaoke',
			SignalRConnection: connection
		});

		SonusUI.OpenIndex()
		SonusUI.OpenPlaylist()
		SonusUI.OpenKaraoke()

		//send time of the song to client upon joining, so the videos are playing in sync
		//on the end of a song, send message to server to remove song from queue in the room
		//when user disconenctes, remove them from the room
		//when host disconnects, remove session
	});
})();
