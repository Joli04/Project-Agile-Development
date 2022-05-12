import {ScoreboardRepository} from "../repositories/scoreboardRepository.js";
import {PointsRepository} from "../repositories/pointsRepository.js";
import {scoreRepository} from "../repositories/scoreRepository.js";
// import {ImagesRepo} from "../repositories/imagesRepo";
import {App} from "../app.js";
import {Controller} from "./controller.js";

export class ScoreboardController extends Controller {
    #scoreboardView
    #scoreboardRepository
    #pointsRepository
    #scoreRepository

    constructor() {
        super();

        this.#pointsRepository = new PointsRepository();
        this.#scoreboardRepository = new ScoreboardRepository();
        //this.#imageRepo = new ImagesRepo();

        this.#setupView();
    }

    async #setupView() {

        this.#scoreboardView = await super.loadHtmlIntoContent("html_views/scoreboard.html")

        await this.sortByPlace();
        await this.selectTime();
        await this.selectPlace();

    }

    #createScoreboard(objects, container) {
        container.innerHTML = "";
        let fragment = document.createDocumentFragment();

        for (let i = 0; i < objects.length; i++) {

            let tr = document.createElement('tr')

            let number = document.createElement('th')
            number.scope = 'row'
            number.className = 'text-center'
            let username = document.createElement('td')
            username.className = 'text-center'
            let location = document.createElement('td')
            location.className = 'text-center'
            let score = document.createElement('td')
            score.className = 'text-center'


            number.textContent = "#" + (i+1);
            username.textContent = objects[i].username
            //Highlights all the information of the user currently logged in.
            // if(username.textContent === App.sessionManager.get("username")){
            //     trBody.style.backgroundColor = "#dbdbdb"
            // }
            location.textContent = objects[i].location
            score.textContent = objects[i].score

            tr.append(number, username, location, score)

            fragment.appendChild(tr);
        }

        container.appendChild(fragment);
    }

    async sortByPlace() {
        //Gets the value of the place/branche that was chosen.
        let places = this.#scoreboardView.querySelector("#places").value;
        //Objects has all the data that comes back from our request that we made in our repository
        let objects = await this.#scoreboardRepository.get(places);
        //Creates the scoreboard with the variable objects
        this.#createScoreboard(objects, this.#scoreboardView.querySelector('#tablebody'))
    }

    async selectPlace() {
        //Everytime when a different branche is chosen, there will be a new table.
        this.#scoreboardView.querySelector("#places").addEventListener("change", (e) => {
            this.#scoreboardView.querySelector('#tablebody').innerHTML = "";
            this.sortByPlace();
        })
    }
    // async sortByPlace(){
    //     //Gets the value of the place/branche that was chosen.
    //     let places = document.getElementById("places").value
    //     //Objects has all the data that comes back from our request that we made in our repository
    //     let objects = await this.#scoreboardRepository.get(places);
    //     //Creates the scoreboard with the variable objects
    //     ScoreboardController.#createScoreboard(objects, document.getElementById('tablebody'))
    // }
    //
    // async selectPlace() {
    //     //Everytime when a different branche is chosen, there will be a new table.
    //     document.getElementById("places").addEventListener("change", (e) => {
    //         document.getElementById('tablebody').innerHTML = "";
    //         this.sortByPlace();
    //     })
    // }

    async showMonthly() {
        let objects = await this.#scoreRepository.get();
        objects.sort((a, b) => {
            return b.score - a.score;
        })
        this.#createScoreboard(objects, this.#scoreboardView.querySelector('#tablebody'))

    }

    async showYearly() {
        let objects = await this.#scoreboardRepository.get(this.#scoreboardView.querySelector('#places').value);
        objects.sort((a, b) => {
            return b.score - a.score;
        })
        this.#createScoreboard(objects, this.#scoreboardView.querySelector('#tablebody'))
    }

    async selectTime() {
        const buttonMonthly = this.#scoreboardView.querySelector("#monthly")
        buttonMonthly.addEventListener("click", (e) => {
            this.#scoreboardView.querySelector("#places").value = "Geen"
            this.showMonthly();
        })

        const buttonYearly = this.#scoreboardView.querySelector("#yearly")

        buttonYearly.addEventListener("click", (e) => {
            this.#scoreboardView.querySelector("#places").value = "Geen"
            this.showYearly();
        })
    }


    // buttonMeanOfTransport() {
    //
    //     console.log("ButtonMeansOfTransport functie word geladen")
    //
    //     let content = document.getElementById("myContentDiv")
    //
    //     /*
    //             let content = document.createElement('div')
    //             content.classList.add("myContentDiv")
    //             content.setAttribute('id', 'myContentDiv')
    //     */
    //
    //
    //     const button = document.getElementById("transportButton")
    //     button.addEventListener("click", callModal)
    //     /*
    //     let button = document.createElement('button')
    //     button.classList.add("dropbtn")
    //     */
    //
    //     const close = document.getElementsByClassName("closeWindow")[0];
    //     close.addEventListener("click", closeModal)
    //
    //     /*
    //             let close = document.createElement('span')
    //             close.classList.add("closeWindow")
    //             close.textContent('&times')
    //     */
    //
    //     window.addEventListener("click", offClickModal)
    //
    //
    //     function callModal() {
    //         console.log("bruh, button geklikt")
    //         content.style.display = "block";
    //     }
    //
    //     function closeModal() {
    //         console.log("X is geklikt")
    //         content.style.display = "none";
    //     }
    //
    //     function offClickModal(event) {
    //         if (event.target === content) {
    //             content.style.display = "none";
    //         }
    //     }
    //
    //     // Confirm whether you want to choose the corresponding vehicle
    //     const secondModalContent = document.querySelector(".second_modal_content");
    //     const closeWindowConfirm = document.querySelector("#closeWindowConfirm");
    //     const transport = document.querySelectorAll(
    //         '#transport1, #transport2, #transport3, #transport4, #transport5');
    //
    //     // todo Robberto dit is de button voor uwe userstory doe er wat leuks mee
    //     const buttonConfirm = document.querySelector("#confirmBtn");
    //
    //     let image1 = new Image();
    //     let image2 = new Image();
    //     let image3 = new Image();
    //     let image4 = new Image();
    //     let image5 = new Image();
    //
    //     let test = [image1, image2, image3, image4, image5]
    //     for (let i = 0; i < test.length; i++) {
    //         test[i].style.maxWidth = "200px";
    //         test[i].style.maxHeight = "200px";
    //     }
    //
    //     image1.src = "assets/Media/auto.png";
    //     image2.src = "assets/Media/elektrischeAuto.png";
    //     image3.src = "assets/Media/trein.png";
    //     image4.src = "assets/Media/fiets.png";
    //     image5.src = "assets/Media/lopend.png";
    //
    //     closeWindowConfirm.addEventListener('click', closeModalConfirm);
    //
    //     for (let i = 0; i < transport.length; i++) {
    //         transport[i].addEventListener("click", callModal2)
    //     }
    //
    //     const images = [image1, image2, image3, image4, image5];
    //
    //     function removeChildren() {
    //         for (let i = 0; i < images.length; i++) {
    //             if (images[i] !== event.target.id && images[i]) {
    //                 images[i].remove();
    //             }
    //         }
    //     }
    //
    //     function addingChildren() {
    //         switch (event.target.id) {
    //             case transport[0].id:
    //                 secondModalContent.appendChild(images[0]);
    //                 break;
    //             case transport[1].id:
    //                 secondModalContent.appendChild(images[1]);
    //                 break;
    //             case transport[2].id:
    //                 secondModalContent.appendChild(images[2]);
    //                 break;
    //             case transport[3].id:
    //                 secondModalContent.appendChild(images[3]);
    //                 break;
    //             case transport[4].id:
    //                 secondModalContent.appendChild(images[4]);
    //                 break;
    //         }
    //     }
    //
    //     function callModal2() {
    //         secondModalContent.style.display = "block";
    //         removeChildren();
    //         addingChildren();
    //         secondModalContent.appendChild(buttonConfirm);
    //     }
    //
    //     function closeModalConfirm() {
    //         secondModalContent.style.display = "none";
    //     }
    //
    //     function offClickModal2(event) {
    //         if (event.target === content) {
    //             secondModalContent.style.display = "none";
    //         }
    //     }
    //
    //     window.addEventListener("click", offClickModal2)
    //
    //
    //
    // }

    // prize() {
    //
    //     const button = document.getElementById("myBtn")
    //     button.addEventListener("click", callModal)
    //
    //     let prizeModal = document.getElementById("prizeModal")
    //     let prizepopup = document.querySelector("#popup-prize")
    //     prizepopup.style.display = "block";
    //     let prizes = document.querySelector(".modal-content")
    //     let popup = document.querySelector(".popup");
    //
    //     var img = document.createElement("img");
    //     var src = document.getElementById("popup-prize");
    //
    //     const close = document.getElementsByClassName("close")[0];
    //     close.addEventListener("click", closeModal)
    //
    //     window.addEventListener("click", offClickModal)
    //
    //
    //     document.getElementById("prize1").onmouseover = function () {
    //         popup.style.display = "block";
    //         prizes.style.display = "block";
    //         img.src = "https://pbs.twimg.com/profile_images/1284476346/vakantie_reasonably_small.gif";
    //         src.appendChild(img);
    //     }
    //
    //     document.getElementById("prize1").onmouseleave = function () {
    //         popup.style.display = "none";
    //     }
    //
    //
    //     document.getElementById("prize2").onmouseover = function () {
    //         popup.style.display = "block";
    //         prizes.style.display = "block";
    //         img.src = "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/vslgdggkdt7kbg1ycqab";
    //         src.appendChild(img);
    //     }
    //
    //     document.getElementById("prize2").onmouseleave = function () {
    //         popup.style.display = "none";
    //     }
    //
    //     document.getElementById("prize3").onmouseover = function () {
    //         popup.style.display = "block";
    //         prizes.style.display = "block";
    //         img.src = "https://pbs.twimg.com/profile_images/51457981/koffie_3__reasonably_small.gif";
    //         src.appendChild(img);
    //     }
    //
    //     document.getElementById("prize3").onmouseleave = function () {
    //         popup.style.display = "none";
    //     }
    //
    //
    //     function callModal() {
    //         prizeModal.style.display = "block";
    //         prizes.style.display = "block";
    //
    //     }
    //
    //     function closeModal() {
    //         prizeModal.style.display = "none";
    //     }
    //
    //     function offClickModal(event) {
    //         if (event.target === prizeModal) {
    //             prizeModal.style.display = "none";
    //         }
    //     }
    // }


    // static #showTransportImages(objects){
    //     let image1;
    //     image1 = document.querySelector("#transport1");
    //     image1.src = "assets/Media/auto.png";
    //
    // }
}
