const SonusModule = (function(){
    
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
                <label for="Title">Title:</label> 
                <input type="text" id="Title" class="js-roomcode" />
            </div>
            <input type="button" value="Search" class="searchButton js-joinroom" />
        </form>
        `
    }

    const loadRoomHost = (container) => {
        container.innerHTML = ``
    }
    const loadRoomClient = (container, RoomType, RoomOption, RoomCode, Name) => {
        container.innerHTML = `
            <h1>${RoomType}</h1>
            <h1>${RoomOption}</h1>
            <h1>${RoomCode}</h1>
            <h1>Welcome ${Name}!</h1>
        `
    }

    return{
        loadIndex:loadIndex,
        loadRoomOptionSelection:loadRoomOptionSelection,
        loadRoomHost:loadRoomHost,
        loadRoomClient:loadRoomClient,
        loadRoomInput:loadRoomInput

    }
})();