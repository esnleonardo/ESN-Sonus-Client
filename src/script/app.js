(function() {

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
	});
})();
