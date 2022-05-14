import {ScoreboardRepository} from "../repositories/scoreboardRepository.js";
import {PointsRepository} from "../repositories/pointsRepository.js";
// import {scoreRepository} from "../repositories/scoreRepository.js";
// import {ImagesRepo} from "../repositories/imagesRepo";
import {App} from "../app.js";
import {Controller} from "./controller.js";

export class ScoreboardController extends Controller {
    #scoreboardView
    #scoreboardRepository
    #pointsRepository

    // #scoreRepository

    constructor() {
        super();

        this.#pointsRepository = new PointsRepository();
        this.#scoreboardRepository = new ScoreboardRepository();
        //this.#imageRepo = new ImagesRepo();

        this.#setupView();
    }

    async #setupView() {

        this.#scoreboardView = await super.loadHtmlIntoContent("html_views/scoreboard.html")

        await this.filterTable();
        // await this.selectTime();
        await this.selectPlace();
        await this.selectTypeScore();
        // await this.sortByScoreType();
    }

    static #createScoreboard(objects, container) {
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


            number.textContent = "#" + (i + 1);
            username.textContent = objects[i].username
            //Highlights all the information of the user currently logged in.
            if (username.textContent === App.sessionManager.get("username")) {
                tr.style.backgroundColor = "#dbdbdb"
            }
            location.textContent = objects[i].location
            score.textContent = objects[i].score

            tr.append(number, username, location, score)

            fragment.appendChild(tr);
        }

        container.appendChild(fragment);
    }

    async filterTable(scoreType) {

        //Gets the value of the place/branche that was chosen.
        let places = this.#scoreboardView.querySelector("#places").value;
        let objects;

        if (scoreType === undefined) {
            //Objects has all the data that comes back from our request that we made in our repository
            objects = await this.#scoreboardRepository.get(places, 'total');
        } else {
            //Objects has all the data that comes back from our request that we made in our repository
            objects = await this.#scoreboardRepository.get(places, scoreType);
        }

        //Creates the scoreboard with the variable objects
        ScoreboardController.#createScoreboard(objects, this.#scoreboardView.querySelector('#tablebody'))

    }

    async selectPlace() {
        //Everytime when a different branche is chosen, there will be a new table.
        this.#scoreboardView.querySelector("#places").addEventListener("change", (e) => {
            this.#scoreboardView.querySelector('#tablebody').innerHTML = "";
            this.filterTable();
        })
    }

    async selectTypeScore() {
        let tablebody = this.#scoreboardView.querySelector('#tablebody');
        let timeScoreSorting = this.#scoreboardView.querySelectorAll('input[name="time-sorting"]');

        timeScoreSorting.forEach(scoreType => {
            scoreType.addEventListener("change", () => {
                tablebody.innerHTML = "";
                console.log(scoreType.value);
                this.filterTable(scoreType.value)
            })
        })
    }


    // async showMonthly() {
    //     let objects = await this.#scoreRepository.get();
    //     objects.sort((a, b) => {
    //         return b.score - a.score;
    //     })
    //     this.#createScoreboard(objects, this.#scoreboardView.querySelector('#tablebody'))
    //
    // }
    //
    // async showYearly() {
    //     let objects = await this.#scoreboardRepository.get(this.#scoreboardView.querySelector('#places').value);
    //     objects.sort((a, b) => {
    //         return b.score - a.score;
    //     })
    //     this.#createScoreboard(objects, this.#scoreboardView.querySelector('#tablebody'))
    // }
    //
    // async selectTime() {
    //     const buttonMonthly = this.#scoreboardView.querySelector("#monthly")
    //     buttonMonthly.addEventListener("click", (e) => {
    //         this.#scoreboardView.querySelector("#places").value = "Geen"
    //         this.showMonthly();
    //     })
    //
    //     const buttonYearly = this.#scoreboardView.querySelector("#yearly")
    //
    //     buttonYearly.addEventListener("click", (e) => {
    //         this.#scoreboardView.querySelector("#places").value = "Geen"
    //         this.showYearly();
    //     })
    // }

}
