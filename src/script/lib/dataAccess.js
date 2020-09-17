const DataAccess = (function () {

    const startConnection = (connection) => {
        connection.start()
		.then(function () {})
		.catch(function (err) {
			return console.error(err.toString());
		});
    }

    //#region Server messages
    const receiveServerHostMessage = (connection) => {
        connection.on("SendServerHostMessage", function (id, name, room) {
            console.log("Server gave permission to create a room");
            SonusModule.loadRoomHost(id, name, room)
            SonusUI.GenerateList()
        });
    }
    
    const receiveServerClientMessage = (connection) => {
        connection.on("SendServerClientMessage", function (id, name, room) {
            console.log("Server gave permission to join the room");
            SonusModule.loadRoomClient(id, name, room)
            SonusUI.GenerateList()
        });
    }

    const receiveServerNewParticipantMessage = (connection) => {
        connection.on("SendServerNotifyNewParticipant", function (room) {
            console.log("update received");
            SonusUI.UpdateData(room);
        });
    }

    const receiveServerSongAdded = (connection) => {
        connection.on("SendServerSongAdded", function (songs) {
            console.log("song update received");
            SonusModule.loadSongs(songs)
        });
    }
    //#endregion

    //#region client messages
    const sendHost = (connection, RoomType, RoomOption) => {
        console.log("Asking server to create room.");
        connection.invoke("SendHostMessage", RoomType, RoomOption).catch(function (err) {
            return console.error(err.toString());
        });
    }
    
    const sendJoin = (connection, RoomType, RoomOption, RoomCode, Name) => {
        console.log("Asking server to join room.");
        connection.invoke("SendJoinMessage", RoomType, RoomOption, RoomCode, Name).catch(function (err) {
            return console.error(err.toString());
        });
    }

    const queueSong = (connection, RoomCode) => {
        console.log("Generating song from server...");
        connection.invoke("SendAddSongMessage", RoomCode).catch(function (err) {
            return console.error(err.toString());
        });
    }
    //#endregion

return {
    startConnection:startConnection,
    sendHost:sendHost,
    sendJoin:sendJoin,
    receiveServerHostMessage:receiveServerHostMessage,
    receiveServerClientMessage:receiveServerClientMessage,
    receiveServerNewParticipantMessage:receiveServerNewParticipantMessage,
    queueSong:queueSong,
    receiveServerSongAdded:receiveServerSongAdded
};
})();