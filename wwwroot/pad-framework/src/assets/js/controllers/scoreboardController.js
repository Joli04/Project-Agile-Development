import {RoomsExampleRepository} from "../repositories/roomsExampleRepository.js";
import {App} from "../app.js";
import {Controller} from "./controller.js";

export class ScoreboardController extends Controller{
    #roomExampleRepository
    #scoreboardView

    constructor() {
        super();

        this.#roomExampleRepository = new RoomsExampleRepository();

        this.#setupView();
    }

    async #setupView(){

        this.#scoreboardView = await super.loadHtmlIntoContent("html_views/scoreboard.html")

        var labels = ['Naam', 'Locatie', 'Score'];
        var objects = [
            {
                "username": "test",
                "location": "Amsterdam",
                "score": 42069
            },
            {
                "username": "Jeff",
                "location": "Rotterdam",
                "score": 19472
            },
            {
                "username": "Richard",
                "location": "Apeldorn",
                "score": 40000
            }
        ]

        this.#createScoreboard(labels, objects, document.getElementById('scoreboard'))

    }

    #createScoreboard(labels, objects, container) {
        var table = document.createElement('table');
        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');

        var theadTr = document.createElement('tr');
        for (var i = 0; i < labels.length; i++) {
            var theadTh = document.createElement('th')
            theadTh.innerHTML = labels[i];
            theadTr.appendChild(theadTh);
        }
        thead.appendChild(theadTr);
        table.appendChild(thead);

        for (var j = 0; j < objects.length; j++) {
            var tbodyTr = document.createElement('tr')
            for (var k = 0; k < labels.length; k++) {
                var tbodyTd = document.createElement('td')
                tbodyTd.innerHTML = objects[j][labels[k]]
                tbodyTr.appendChild(tbodyTd);
            }
            tbody.appendChild(tbodyTr);
        }
        table.appendChild(tbody);
        container.appendChild(table);
    }

}