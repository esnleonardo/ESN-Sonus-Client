//Hoofdmodule
const SonusUI = (function () {
    let Container = null;
    let RoomType = null
    let RoomOption = null
    let RoomCode = null 
    let Name = null
    let connection = null
    
    const AppSetup = function ({ContainerClass, SignalRConnection}) {
        Container = document.querySelector(ContainerClass);
        connection = SignalRConnection
    }
    
    //#region open pages
    const OpenIndex = () => {
        SonusModule.loadIndex(Container)
    }

    const OpenPlaylist = () => {
        let Playlist = document.querySelector(".js-playlist");
        Playlist.addEventListener('click', () => {
            RoomType = "playlist"
            SonusModule.loadRoomOptionSelection(Container)
            OpenHost()
		    OpenJoin()
        })
    }

    const OpenKaraoke = () => {
        let Karaoke = document.querySelector(".js-karaoke");
        Karaoke.addEventListener('click', () => {
            RoomType = "karaoke"
            SonusModule.loadRoomOptionSelection(Container)
            OpenHost()
		    OpenJoin()
        })
    }

    const OpenJoin = () => {
        let Join = document.querySelector(".js-join");
        Join.addEventListener('click', () => {
            RoomOption = "join"
            SonusModule.loadRoomInput(Container)
            let JoinRoom = document.querySelector(".js-joinroom")
            JoinRoom.addEventListener("click", () => {
                RoomCode = document.querySelector(".js-roomcode").value
                Name = document.querySelector(".js-name").value
                DataAccess.sendJoin(connection, RoomType, RoomOption, RoomCode, Name)
            })
        })
    }
    
    const OpenHost = () => {
        let Host = document.querySelector(".js-host");
        Host.addEventListener('click', () => {
            RoomOption = "host"
            DataAccess.sendHost(connection, RoomType, RoomOption)
        })
    }
    //#endregion
    
    //#region appending data
    const appendHost = function(host){
        Container.innerHTML = ""
        try {Container.append(host)} catch (error) {}
    }

    const appendClient = function(client){
        Container.innerHTML = ""
        try {Container.append(client)} catch (error) {}
    }

    const appendSong = (song) => {        
        let Queueholder = document.querySelector(".js-queue-holder");
        try {Queueholder.append(song)} catch (error) {}
    }

    const appendSearchedSong = (song) => {        
        let Songholder = document.querySelector(".c-song-search__holder");
        try {Songholder.append(song)} catch (error) {}
    }
    //#endregion

    const UpdateData = (room) => {
        let amount = document.querySelector(".js-amount");
        amount.textContent = `This room has ${room.participants.length} people in it.`
    }

    const onVideoClick = (id, title, creator) => {
        let roomcode = document.querySelector(".js-room-code-text").textContent
        DataAccess.queueSong(connection, roomcode, id, title, creator)
    }

    const songEnded = () =>{
        DataAccess.songEnded(connection)
    }

    return {
        AppSetup: AppSetup,
        OpenIndex: OpenIndex,
        OpenPlaylist:OpenPlaylist,  
        OpenKaraoke:OpenKaraoke,    
        OpenHost:OpenHost,
        OpenJoin:OpenJoin,
        appendHost:appendHost,
        appendClient:appendClient,
        UpdateData:UpdateData,
        appendSong:appendSong,
        appendSearchedSong:appendSearchedSong,
        onVideoClick:onVideoClick,
        songEnded:songEnded
    };
})();