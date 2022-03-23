import {ScoreboardRepository} from "../repositories/scoreboardRepository.js";
import {App} from "../app.js";
import {Controller} from "./controller.js";

export class ScoreboardController extends Controller{
    #scoreboardView
    #scoreboardRepository

    constructor() {
        super();

        this.#scoreboardRepository = new ScoreboardRepository();

        this.#setupView();
    }

    async #setupView(){

        this.#scoreboardView = await super.loadHtmlIntoContent("html_views/scoreboard.html")

        let labels = ['Username', 'Location', 'Score'];
        let objects = await this.#scoreboardRepository.get();
        objects.sort((a, b) => {
            return b.score - a.score;
        })
        ScoreboardController.#createScoreboard(labels, objects, document.getElementById('scoreboard'))

        this.buttonMeanOfTransport();
        this.prize();

    }

    buttonMeanOfTransport(){

        console.log("ButtonMeansOfTransport functie word geladen")

        let content = document.getElementById("myContentDiv")

/*
        let content = document.createElement('div')
        content.classList.add("myContentDiv")
        content.setAttribute('id', 'myContentDiv')
*/


        const button = document.getElementById("transportButton")
        button.addEventListener("click", callModal)
        /*
        let button = document.createElement('button')
        button.classList.add("dropbtn")
        */

        const close = document.getElementsByClassName("closeWindow")[0];
        close.addEventListener("click", closeModal)

/*
        let close = document.createElement('span')
        close.classList.add("closeWindow")
        close.textContent('&times')
*/

        window.addEventListener("click", offClickModal)


        function callModal() {
            console.log("bruh, button geklikt")
            content.style.display = "block";
        }

        function closeModal() {
            console.log("X is geklikt")
            content.style.display = "none";
        }

        function offClickModal(event) {
            if (event.target === content){
                content.style.display = "none";
            }
        }



    }

    prize(){

        const button = document.getElementById("myBtn")
        button.addEventListener("click", callModal)

        let prizeModal = document.getElementById("prizeModal")
        let prizepopup = document.querySelector("#popup-prize")
        prizepopup.style.display = "block";
        let prizes = document.querySelector(".modal-content")
        let popup = document.querySelector(".popup");

        var img = document.createElement("img");
        var src = document.getElementById("popup-prize");

        const close = document.getElementsByClassName("close")[0];
        close.addEventListener("click", closeModal)

        window.addEventListener("click", offClickModal)


        document.getElementById("prize1").onmouseover = function (){
            popup.style.display = "block";
            prizes.style.display = "block";
            img.src = "https://pbs.twimg.com/profile_images/1284476346/vakantie_reasonably_small.gif";
            src.appendChild(img);
        }

        document.getElementById("prize1").onmouseleave = function (){
            popup.style.display = "none";
        }


        document.getElementById("prize2").onmouseover = function (){
            popup.style.display = "block";
            prizes.style.display = "block";
            img.src = "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/vslgdggkdt7kbg1ycqab";
            src.appendChild(img);
        }

        document.getElementById("prize2").onmouseleave = function (){
            popup.style.display = "none";
        }

        document.getElementById("prize3").onmouseover = function (){
            popup.style.display = "block";
            prizes.style.display = "block";
            img.src = "https://pbs.twimg.com/profile_images/51457981/koffie_3__reasonably_small.gif";
            src.appendChild(img);
        }

        document.getElementById("prize3").onmouseleave = function (){
            popup.style.display = "none";
        }


        function callModal() {
            console.log("bruh, button geklikt")
            prizeModal.style.display = "block";
            prizes.style.display = "block";

        }
        function closeModal() {
            console.log("X is geklikt")
            prizeModal.style.display = "none";
        }

        function offClickModal(event) {
            if (event.target === prizeModal){
                prizeModal.style.display = "none";
            }
        }


    }

    static #createScoreboard(labels, objects, container) {
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        table.classList.add("table");
        thead.classList.add("tablehead");
        tbody.classList.add("tablebody");
        tbody.setAttribute("id","tablebody")

        let theadTr = document.createElement('tr');
        for (let i = 0; i < labels.length; i++) {
            let theadTh = document.createElement('th')
            theadTh.innerHTML = labels[i];
            theadTr.appendChild(theadTh);
        }
        thead.appendChild(theadTr);
        table.appendChild(thead);

        for (let j = 0; j < objects.length; j++) {
            let tbodyTr = document.createElement('tr')
            for (let k = 0; k < labels.length; k++) {
                let tbodyTd = document.createElement('td')
                tbodyTd.innerHTML = objects[j][labels[k].toLowerCase()]
                tbodyTr.appendChild(tbodyTd);
            }
            tbody.appendChild(tbodyTr);
        }
        table.appendChild(tbody);
        container.appendChild(table);

    }

}

