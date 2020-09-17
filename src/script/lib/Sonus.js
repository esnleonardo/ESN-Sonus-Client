class Host{
    constructor({id, name, participants, roomCode, roomOption, roomType, songs }){
        Object.assign(this,{id, name, participants, roomCode, roomOption, roomType, songs});
    }
    generateDOMNode(){
        this.songs = {
            Title: "JaJa DingDong",
            Singer: "Eurovision Song Festival",
            Requester: "Bram Robyn",
            Time:"5:0",
        }
        let container1 = document.createElement('div');
        let container = document.createElement('div');
        container.classList.add("c-karaoke__wrapper")
        container.innerHTML = `
            <div class="c-video-container">
                <div>
                    <div class="c-video"></div>
                    <div class="c-video__title">${this.songs.Title} <span class="u-font-light-x">- ${this.songs.Singer}</span></div>
                    <div class="c-video__requester">${this.songs.Requester}</div>
                </div>
                <div class="c-room-options">
                    <p class="c-room-options__roomcode">Welcome <span class="u-font-dark">${this.name}</span>!</p>
                    <p class="c-room-options__roomcode">Room Code: <span class="u-font-dark js-room-code-text">${this.roomCode}</span></p>
                    <p class="c-room-options__connectedusers"><span class="u-font-dark">${this.participants.length}</span> connected user(s)</p>
                </div>
            </div>
        `
        container1.appendChild(container)
        container1.innerHTML += `
            <div class="c-listing-container">
                <div class="c-queue js-queue-holder">




                    <div class="c-queue-item">
                        <div class="c-queue-item__info">
                            <h1 class="c-queue-item__info--count u-font-dark">1</h1>
                            <div class="c-queue-item__info-holder">
                                <p class="c-queue-item__info-holder__title">JaJa Ding Dong</p>
                                <p class="c-queue-item__info-holder__creator u-font-light">Eurosong Festival</p>
                            </div>
                        </div>
                        <div class="c-queue-item__division"></div>
                        <p class="c-queue-item__requester">Bram Robyn</p>
                    </div>


                    
                </div>
                <div class="c-song-search">
                    <div class="c-song-search__search">
                        <input class="c-song-search__input" type="text"/>
                        </div>
                        <button class="js-test">Generate</button>
                        <div class="c-song-search__list">
                        <div class="c-song-search__holder">
                            <div class="c-song-search__holder-detail-container">
                                <p class="c-song-search__holder-detail__item"></p>
                                <p class="c-song-search__holder-detail__item"></p>
                            </div>
                            <div class="c-song-search__holder-image-container">
                                <img src="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        return container1;
    }
}
class Client{
    constructor({id, name, participants, roomCode, roomOption, roomType, songs }){
        Object.assign(this,{id, name, participants, roomCode, roomOption, roomType, songs});
    }
    
    generateDOMNode(){
        this.songs = {
            Title: "JaJa DingDong",
            Singer: "Eurovision Song Festival",
            Requester: "Bram Robyn",
            Time:"5:0",
        }
        let container1 = document.createElement('div');
        let container = document.createElement('div');
        container.classList.add("c-karaoke__wrapper")
        container.innerHTML = `
            <div class="c-video-container">
                <div>
                    <div class="c-video"></div>
                    <div class="c-video__title">${this.songs.Title} <span class="u-font-light-x">- ${this.songs.Singer}</span></div>
                    <div class="c-video__requester">${this.songs.Requester}</div>
                </div>
                <div class="c-room-options">
                    <p class="c-room-options__roomcode">Welcome <span class="u-font-dark">${this.name}</span>!</p>
                    <p class="c-room-options__roomcode">Room Code: <span class="u-font-dark js-room-code-text">${this.roomCode}</span></p>
                    <p class="c-room-options__connectedusers"><span class="u-font-dark">${this.participants.length}</span> connected user(s)</p>
                </div>
            </div>
        `
        container1.appendChild(container)
        container1.innerHTML += `
            <div class="c-listing-container">
                <div class="c-queue js-queue-holder">




                    <div class="c-queue-item">
                        <div class="c-queue-item__info">
                            <h1 class="c-queue-item__info--count u-font-dark">1</h1>
                            <div class="c-queue-item__info-holder">
                                <p class="c-queue-item__info-holder__title">JaJa Ding Dong</p>
                                <p class="c-queue-item__info-holder__creator u-font-light">Eurosong Festival</p>
                            </div>
                        </div>
                        <div class="c-queue-item__division"></div>
                        <p class="c-queue-item__requester">Bram Robyn</p>
                    </div>


                    
                </div>
                <div class="c-song-search">
                    <div class="c-song-search__search">
                        <input class="c-song-search__input" type="text"/>
                        </div>
                        <button class="js-test">Generate</button>
                        <div class="c-song-search__list">
                        <div class="c-song-search__holder">
                            <div class="c-song-search__holder-detail-container">
                                <p class="c-song-search__holder-detail__item"></p>
                                <p class="c-song-search__holder-detail__item"></p>
                            </div>
                            <div class="c-song-search__holder-image-container">
                                <img src="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        return container1;
    }
}

class Song{
    constructor({title, singer, requester, time}){
        Object.assign(this,{title, singer, requester, time});
    }
    
    generateDOMNode(key){
        let container = document.createElement('div');
        container.classList.add("c-queue-item")
        container.innerHTML = `
            <div class="c-queue-item__info">
                <h1 class="c-queue-item__info--count u-font-dark">${key}</h1>
                <div class="c-queue-item__info-holder">
                    <p class="c-queue-item__info-holder__title">${this.title}</p>
                    <p class="c-queue-item__info-holder__creator u-font-light">${this.singer}</p>
                </div>
            </div>
            <div class="c-queue-item__division"></div>
            <p class="c-queue-item__requester">${this.requester}</p>
        
        `
        return container;
    }
}