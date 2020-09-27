const SonusModule = (function(){
    let player;
    let queueIdList = ""

    //#region pages
    const loadIndex = function(container){
        container.innerHTML = `
        <header>
            <nav class="c-header">
                <div class="c-header__logo">
                    <img class="c-header__logo-item" src="./assets/esn-star.png" />
                </div>
            </nav>
        </header>
        
        
        <div class="c-type-selection__container">
            <a class="c-type-selection__item c-type-selection__karaoke js-karaoke" >
                <img class="c-type-selection__item-image--karaoke" src="./assets/karaoke.jpg" />
                <p class="c-type-selection__item-text--karaoke">Karaoke</p>
            </a>
            <a class="c-type-selection__item c-type-selection__playlist js-playlist" >
                <img class="c-type-selection__item-image--playlist" src="./assets/vinyls.jpg" />
                <p class="c-type-selection__item-text--playlist">Playlist</p>
            </a>
        </div>
        
        
        <footer class="c-footer">
            <div class="c-footer__item">
                <img class="c-footer__logo-item" src="./assets/White_LogoESN.png" />
                <p class="c-footer__item-creator">
                    Made by Bram Robyn (Equinox)
                </p>
                <p class="c-footer__item-name">
                    &copy; 2020 - ESN Sonus
                </p>
            </div>
        </footer>
                            `
    }

    const loadRoomOptionSelection = function(container){
        container.innerHTML = `
        <header>
            <nav class="c-header">
                <div class="c-header__logo">
                    <img class="c-header__logo-item" src="./assets/esn-star.png" />
                </div>
            </nav>
        </header>
        
        
        <div class="c-type-selection__container">
            <a class="c-type-selection__item c-type-selection__karaoke js-host" >
                <img class="c-type-selection__item-image--karaoke" src="./assets/karaoke.jpg" />
                <p class="c-type-selection__item-text--karaoke">Host</p>
            </a>
            <a class="c-type-selection__item c-type-selection__playlist js-join">
                <img class="c-type-selection__item-image--playlist" src="./assets/vinyls.jpg" />
                <p class="c-type-selection__item-text--playlist">Join</p>
            </a>
        </div>
        
        
        <footer class="c-footer">
            <div class="c-footer__item">
                <img class="c-footer__logo-item" src="./assets/White_LogoESN.png" />
                <p class="c-footer__item-creator">
                    Made by Bram Robyn (Equinox)
                </p>
                <p class="c-footer__item-name">
                    &copy; 2020 - ESN Sonus
                </p>
            </div>
        </footer>
                            `
    }

    const loadRoomInput = (container) => {
        container.innerHTML = `
        <form class="form-inline" role="form" data-toggle="validator">
            <div class="form-group">
                <label for="Name">Name:</label> 
                <input type="text" id="Name" class="js-name"/>
            </div>
            <div class="form-group">
                <label for="RoomCode">Room Code:</label> 
                <input type="text" id="RoomCode" class="js-roomcode" />
            </div>
            <input type="button" value="Search" class="searchButton js-joinroom" />
        </form>
        `
    }
    //#endregion

    //#region loading classes and appending data
    const loadRoomHost = async (id, name, room) => {
        let participants = room.participants
        let roomCode = room.roomCode
        let roomOption = room.roomOption
        let roomType = room.roomType
        let songs = room.songs
        let host = new Host({id, name, participants, roomCode, roomOption, roomType, songs});
        SonusUI.appendHost(host.generateDOMNode());       
        
        YT.ready(function(){
			player = new YT.Player('player', {
                width: 920,
                height: 500,
                videoId: 'Xa0Q0J5tOP0',
                playerVars: {
                    color: 'white',
                    playlist: queueIdList
                },
                events: {
                    onReady: initialize,
                    onStateChange: onPlayerStateChange      
                }
            });
        });
    }

    const loadRoomClient = (id, name, room) => {
        let participants = room.participants
        let roomCode = room.roomCode
        let roomOption = "join"
        let roomType = room.roomType
        let songs = room.songs
        let client = new Client({id, name, participants, roomCode, roomOption, roomType, songs});
        SonusUI.appendClient(client.generateDOMNode());   

        YT.ready(function(){
			player = new YT.Player('player', {
                width: 920,
                height: 500,
                videoId: 'Xa0Q0J5tOP0',
                playerVars: {
                    color: 'white',
                    playlist: queueIdList
                },
                events: {
                    onReady: initialize,
                    onStateChange: onPlayerStateChange            
                }
           });
        })
    }

    const loadSongs = (songs) => {
        let Queueholder = document.querySelector(".js-queue-holder");
        Queueholder.innerHTML = ""
        let i = 1
        songs.forEach(element => {
            let title = element.title
            let singer = element.singer
            let requester = element.requester
            let time = element.time
            let id = element.songId
            let song = new Song({title, singer, requester, time});
            queueIdList += `${id},`
            SonusUI.appendSong(song.generateDOMNode(i));  
            i++
        });
    }

    const loadSearchedSongs = (data) => {
        let i = 1
        data.forEach(element => {
            let id= element.id.videoId;
            let creator= element.snippet.channelTitle;
            let title= element.snippet.title;
            let thumbnail= element.snippet.thumbnails.default.url;
            let searchedSong = new YTSong({id, creator, title, thumbnail});
            SonusUI.appendSearchedSong(searchedSong.generateDOMNode(i));  
            i++
        })
    }
    //#endregion

    // #region youtube player 
    const initialize = (event) => {
        event.target.playVideo();
    }

    const onPlayerStateChange = (event) => {
        if(event.data == 0){
            console.log("done");
            SonusUI.songEnded()
        }
    }
    //#endregion
    
    return{
        loadIndex:loadIndex,
        loadRoomOptionSelection:loadRoomOptionSelection,
        loadRoomHost:loadRoomHost,
        loadRoomClient:loadRoomClient,
        loadRoomInput:loadRoomInput,
        loadSongs:loadSongs,
        loadSearchedSongs:loadSearchedSongs,
    }
})();