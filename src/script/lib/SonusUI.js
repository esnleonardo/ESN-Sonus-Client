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

    const OpenHost = () => {
        let Host = document.querySelector(".js-host");
        Host.addEventListener('click', () => {
            RoomOption = "host"
            SonusModule.loadRoomHost(Container)
            DataAccess.sendHost(connection, RoomType, RoomOption)
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
                OpenRoom(RoomType, RoomOption, RoomCode, Name)
            })
        })
    }
    
    const OpenRoom = (RoomType, RoomOption, RoomCode, Name) => {
        SonusModule.loadRoomClient(Container, RoomType, RoomOption, RoomCode, Name)
    }


    return {
        AppSetup: AppSetup,
        OpenIndex: OpenIndex,
        OpenPlaylist:OpenPlaylist,  
        OpenKaraoke:OpenKaraoke,    
        OpenHost:OpenHost,
        OpenJoin:OpenJoin,
        OpenRoom:OpenRoom,
    };
})();