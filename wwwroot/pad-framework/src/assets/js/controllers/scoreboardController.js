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
/*        objects.sort((a, b) => {
            return a.score - b+score;
        })*/
        ScoreboardController.#createScoreboard(labels, objects, document.getElementById('scoreboard'))

    }

    static #createScoreboard(labels, objects, container) {
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

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