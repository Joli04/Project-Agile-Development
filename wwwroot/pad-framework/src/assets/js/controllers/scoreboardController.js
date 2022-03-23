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

        this.sortByName();
    }

    sortByName(){
        const sortBtn = document.getElementById('sort-btn');

        //change this selector to the class/id of the table
        let compList = document.getElementById("scoreboardTbody");

        let nameRow = 1;

        sortBtn.addEventListener("click", () => {
            //Chane the col selector to the column that the names are in
            sort_table(compList, 0, nameRow); nameRow *= -1;
        })

        function sort_table(tbody, col, asc){
            let rows = tbody.rows
            let rlen = rows.length
            let arr = new Array()

            // fill the array with values from the table
            for(let i = 0; i < rlen; i++){
                let cells = rows[i].cells;
                let clen = cells.length;
                arr[i] = new Array();
                for(let j = 0; j < clen; j++){
                    arr[i][j] = cells[j].innerHTML;
                }
            }
            // sort the array by the specified column number (col) and order (asc)
            arr.sort(function(a, b){
                return (a[col] == b[col]) ? 0 : ((a[col] > b[col]) ? asc : -1*asc);
            });
            // replace existing rows with new rows created from the sorted array
            for(let i = 0; i < rlen; i++){
                arr[i] = "<td>"+arr[i].join("</td><td>")+"</td>";
            }
            tbody.innerHTML = "<tr>"+arr.join("</tr><tr>")+"</tr>";
        }
    }

    static #createScoreboard(labels, objects, container) {
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        tbody.setAttribute('id','scoreboardTbody');

        let tbodyTd;

        table.classList.add("table");
        thead.classList.add("tablehead");
        tbody.classList.add("tablebody");

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
                tbodyTd = document.createElement('td')
                tbodyTd.innerHTML = objects[j][labels[k].toLowerCase()]
                tbodyTr.appendChild(tbodyTd);
            }
            tbody.appendChild(tbodyTr);
        }
        table.appendChild(tbody);
        container.appendChild(table);
        tbodyTd.classList.add("tbodytd");
    }

}