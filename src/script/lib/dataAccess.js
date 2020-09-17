const DataAccess = (function () {

    const startConnection = (connection) => {
        connection.start()
		.then(function () {})
		.catch(function (err) {
			return console.error(err.toString());
		});
    }

    const receiveServerHostMessage = (connection) => {
        connection.on("SendServerHostMessage", function (id, name, room) {
            console.log("Server gave permission to create a room");
            SonusModule.loadRoomHost(id, name, room)
        });
    }
    
    const receiveServerClientMessage = (connection) => {
        connection.on("SendServerClientMessage", function (id, name, room) {
            console.log("Server gave permission to join the room");
            SonusModule.loadRoomClient(id, name, room)
        });
    }

    const receiveServerNewParticipantMessage = (connection) => {
        connection.on("SendServerNotifyNewParticipant", function (room) {
            console.log("update received");
            SonusUI.UpdateData(room);
        });
    }

    const sendHost = (connection, RoomType, RoomOption) => {
        connection.invoke("SendHostMessage", RoomType, RoomOption).catch(function (err) {
            console.log("Asking server to create room.");
            return console.error(err.toString());
        });
    }
    
    const sendJoin = (connection, RoomType, RoomOption, RoomCode, Name) => {
        connection.invoke("SendJoinMessage", RoomType, RoomOption, RoomCode, Name).catch(function (err) {
            console.log("Asking server to join room.");
            return console.error(err.toString());
        });
    }

return {
    startConnection:startConnection,
    sendHost:sendHost,
    sendJoin:sendJoin,
    receiveServerHostMessage:receiveServerHostMessage,
    receiveServerClientMessage:receiveServerClientMessage,
    receiveServerNewParticipantMessage:receiveServerNewParticipantMessage
};
})();