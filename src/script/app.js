(function() {

	document.addEventListener('DOMContentLoaded', () => {
		var connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:44349/Sonus").build()
		DataAccess.startConnection(connection)

		SonusUI.AppSetup({
			ContainerClass: '.js-container',
			PlaylistClass: '.js-playlist',
			KaraokeClass: '.js-karaoke',
			SignalRConnection: connection
        });

		SonusUI.OpenIndex()
		SonusUI.OpenPlaylist()
		SonusUI.OpenKaraoke()
		// SonusUI.OpenHost()
		// SonusUI.OpenJoin()
		// SonusUI.OpenRoom()

		
	});
})();
