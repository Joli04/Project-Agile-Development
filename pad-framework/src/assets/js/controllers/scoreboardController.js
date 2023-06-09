import {ScoreboardRepository} from "../repositories/scoreboardRepository.js";
import {PointsRepository} from "../repositories/pointsRepository.js";
import {BadgesRepository} from "../repositories/badgesRepository.js";
import {user_badgesRepository} from "../repositories/user_badgesRepository.js";
// import {ImagesRepo} from "../repositories/imagesRepo";
import {App} from "../app.js";
import {Controller} from "./controller.js";


export class ScoreboardController extends Controller {
    #scoreboardView
    #scoreboardRepository
    #pointsRepository
    #badgesRepository
    #user_badgesRepository

    constructor() {
        super();

        this.#scoreboardRepository = new ScoreboardRepository();
        this.#badgesRepository = new BadgesRepository();
        this.#user_badgesRepository = new user_badgesRepository();
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
        await this.selectPlace();
        await this.badgePopUp();

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

    async badgePopUp() {
        const popUp = this.#scoreboardView.querySelector(".badge-popup");
        const badge = await this.#scoreboardRepository.getBadges();
        const closebtnPopUp = this.#scoreboardView.querySelector(".closepopup")
        const userBadge = await this.#user_badgesRepository.get();
        console.log(userBadge)
        console.log(badge)

        await this.showCorrectBadge();
        for (let i = 0; i < badge.length; i++) {

            let badgeAchieved = badge[i].badge_achieved

            console.log(badgeAchieved)
            if (badgeAchieved === 0){
                console.log("dit doet iets")
                popUp.style.visibility = "visible"
                popUp.style.top = "75%"
                popUp.style.transform = "translate(-50%, -50%) scale(1)"
                await this.#badgesRepository.update(1);
                break
            }
            else{

            }
        }

        // for (let i = 0; i < userBadge.length; i++) {
        //     let userBadgeAchieved = userBadge[i].badge_seen
        //     let userid = userBadge[i].id_user
        //     let badgeId = userBadge[i].id_badge
        //     console.log(userBadgeAchieved)
        //
        //         if (userid ===  && badgeId === )
        // }

        closebtnPopUp.addEventListener("click", () => {
            popUp.style.visibility = "hidden"
            popUp.style.transition = "transform` 0.4s, top 0.4s"
            popUp.style.transform = "translate(-50%, -50%) scale(0.1)"
        })
    }

    async showCorrectBadge() {

        const imageSrc = this.#scoreboardView.querySelector(".imgBadge");
        const badge = await this.#scoreboardRepository.getBadges();

        for (let i = 0; i < badge.length; i++) {

            let badgeAchieved = badge[i].badge_achieved

            if (badgeAchieved === 0){
                imageSrc.src = await badge[i].badge_image;
                console.log("ja")
                break
            }
            else {
                console.log("nee")
            }
        }


    }

}
