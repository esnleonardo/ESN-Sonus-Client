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
            console.log("Server gave permission to create a room.");
            SonusModule.loadRoomHost(id, name, room)
            SonusModule.searchSongs()
        });
    }
    
    const receiveServerClientMessage = (connection) => {
        connection.on("SendServerClientMessage", function (id, name, room) {
            console.log("Server gave permission to join the room.");
            SonusModule.loadRoomClient(id, name, room)
            SonusModule.searchSongs()
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
        console.log("Asking server to create room...");
        connection.invoke("SendHostMessage", RoomType, RoomOption).catch(function (err) {
            return console.error(err.toString());
        });
    }
    
    const sendJoin = (connection, RoomType, RoomOption, RoomCode, Name) => {
        console.log("Asking server to join room...");
        connection.invoke("SendJoinMessage", RoomType, RoomOption, RoomCode, Name).catch(function (err) {
            return console.error(err.toString());
        });
    }

    const queueSong = (connection, RoomCode, id, title, creator) => {
        console.log("Making song handshake with the server...");
        connection.invoke("SendAddSongMessage", RoomCode, id, title, creator).catch(function (err) {
            return console.error(err.toString());
        });
    }

    const songEnded = (connection) => {
        console.log("Telling Server the song has ended...");
        connection.invoke("SendSongEndedMessage").catch(function (err) {
            return console.error(err.toString());
        });
    }
    //#endregion

    const key = "AIzaSyAbF8ecZ0TzrbSMQoAGXNW4yNQ5FeXIf6o"
    // https://www.googleapis.com/youtube/v3/search?type=video?videoEmbeddable=true?videoDimension=2d?maxResults=10?q=metallica&key=AIzaSyBXem9njEU44T-3WPd5y9vKdv6y_K6FZgg
    const baseurl = ` https://www.googleapis.com/youtube/v3/search?type=video&videoEmbeddable=true&videoDimension=2d&part=snippet&maxResults=9&q=`
    const searchSongs = () => {
        let inputfield = document.querySelector(".c-song-search__input")
        inputfield.addEventListener("keyup", (e) => {
            if (e.key === 'Enter' || e.keyCode === 13) {
                let Songholder = document.querySelector(".c-song-search__holder");
                Songholder.innerHTML = ""
                fetch(baseurl + e.target.value + "karaoke" + `&key=${key}`, {
                    contentType: "application/json",
                    authorization: "AIzaSyAbF8ecZ0TzrbSMQoAGXNW4yNQ5FeXIf6o",
                    accept: "application/json"
                    
                })
                .then(
                    (response) => {
                        if (response.status !== 200) {
                            // console.log(baseurl + e.target.value + `&key=${key}`);
                            console.log('Looks like there was a problem. Status Code: ' +response);
                            return;
                        }
                        
                        response.json().then((data) => {
                            // console.log(data);
                            SonusModule.loadSearchedSongs(data.items)
                        });
                    }
                )
                .catch(function(err) {console.log('Fetch Error :-S', err);});
            }
        })
    }

    return {
        startConnection:startConnection,
        sendHost:sendHost,
        sendJoin:sendJoin,
        receiveServerHostMessage:receiveServerHostMessage,
        receiveServerClientMessage:receiveServerClientMessage,
        receiveServerNewParticipantMessage:receiveServerNewParticipantMessage,
        queueSong:queueSong,
        receiveServerSongAdded:receiveServerSongAdded,
        searchSongs:searchSongs,
        songEnded:songEnded
    };
})();