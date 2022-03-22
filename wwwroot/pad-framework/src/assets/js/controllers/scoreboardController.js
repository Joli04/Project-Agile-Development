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
        this.buttonMeanOfTransport();
    }

    async #setupView(){

        this.#scoreboardView = await super.loadHtmlIntoContent("html_views/scoreboard.html")

        let labels = ['Username', 'Location', 'Score'];
        let objects = await this.#scoreboardRepository.get();
        objects.sort((a, b) => {
            return b.score - a.score;
        })
        ScoreboardController.#createScoreboard(labels, objects, document.getElementById('scoreboard'))
    }

    buttonMeanOfTransport(){

        let content = document.getElementById("myContentDiv")

/*
        let content = document.createElement('div')
        content.classList.add("myContentDiv")
        content.setAttribute('id', 'myContentDiv')
*/


        const button = document.getElementsByClassName("dropbtn")
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
            console.log("bruh, X is geklikt yo")
            content.style.display = "none";
        }

        function offClickModal(event) {
            if (event.target === content){
                content.style.display = "none";
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
        tbodytd.classList.add("tbodytd");
    }

}

