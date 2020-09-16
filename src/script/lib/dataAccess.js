const DataAccess = (function () {

    const startConnection = (connection) => {
        connection.start()
		.then(function () {})
		.catch(function (err) {
			return console.error(err.toString());
		});
    }

    const sendHost = (connection, RoomType, RoomOption) => {
        connection.invoke("SendHostMessage", RoomType, RoomOption).catch(function (err) {
            return console.error(err.toString());
        });
    }

    const sendJoin = (connection, RoomType, RoomOption, RoomCode, Name) => {
        connection.invoke("SendJoinMessage", RoomType, RoomOption, RoomCode, Name).catch(function (err) {
            return console.error(err.toString());
        });
    }
    
    // connection.on("ReceiveMessage", function (user, message) {
    //     var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //     var encodedMsg = user + " says " + msg;
    //     var li = document.createElement("li");
    //     li.textContent = encodedMsg;
    //     document.getElementById("messagesList").appendChild(li);
    // });
    // connection.start().then(function () {
    //     document.getElementById("sendButton").disabled = false;
    // }).catch(function (err) {
    //     return console.error(err.toString());
    // });
    

return {
    startConnection:startConnection,
    sendHost:sendHost,
    sendJoin:sendJoin
};
})();