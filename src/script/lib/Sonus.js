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
                    <div class="c-video">
                        <div id="player"></div>
                    </div>
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

                </div>
                <div class="c-song-search">
                    <div class="c-song-search__search">
                        <input class="c-song-search__input" type="text"/>
                    </div>
                    <div class="c-song-search__list">
                        <div class="c-song-search__holder">

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
                    <div class="c-video">
                        <div id="player"></div>
                    </div>
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
   
                </div>
                <div class="c-song-search">
                    <div class="c-song-search__search">
                        <input class="c-song-search__input" type="text"/>
                    </div>
                    <div class="c-song-search__list">
                        <div class="c-song-search__holder">

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

class YTSong{
    constructor({id, creator, title, thumbnail}){
        Object.assign(this,{id, creator, title, thumbnail});
    }
    
    generateDOMNode(key){
        let container = document.createElement('div');
        container.classList.add("c-song-search__holder-container")
        container.setAttribute("id", this.id)
        container.innerHTML = `
            <div class="c-song-search__holder-detail-container">
                <p class="c-song-search__holder-detail__item u-font-light-x">${this.title}</p>
                <p class="c-song-search__holder-detail__item u-font-light">${this.creator}</p>
            </div>                                
            <div class="c-song-search__holder-image-container">
                <img src="${this.thumbnail}">
            </div>
        `
        container.addEventListener("click", (e) => {
            let id = ""
            let creator = ""
            let title = ""
            if(e.target.localName === "p"){
                if(!e.target.classList.contains("u-font-light-x")){
                    creator = e.target.textContent
                    title = e.target.previousElementSibling.textContent
                    id = e.target.parentNode.parentNode.id
                }
                else{
                    creator = e.target.nextElementSibling.textContent
                    title = e.target.textContent
                    id = e.target.parentNode.parentNode.id
                }
            }

            if(e.target.localName === "div"){
                id = e.target.id
                creator = e.target.children[0].lastElementChild.textContent
                title = e.target.children[0].firstElementChild.textContent
            }

            if(e.target.localName === "img"){
                id = e.target.parentNode.parentNode.id
                creator = e.target.parentNode.parentNode.children[0].lastElementChild.textContent
                title = e.target.parentNode.parentNode.children[0].firstElementChild.textContent
            }
            SonusUI.onVideoClick(id, title, creator)
        })
        return container;
    }
}