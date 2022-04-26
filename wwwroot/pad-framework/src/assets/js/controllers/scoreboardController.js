import {ScoreboardRepository} from "../repositories/scoreboardRepository.js";
import {PointsRepository} from "../repositories/pointsRepository.js";
// import {ImagesRepo} from "../repositories/imagesRepo";
import {App} from "../app.js";
import {Controller} from "./controller.js";

export class ScoreboardController extends Controller {
    #scoreboardView
    #scoreboardRepository
    #pointsRepository
    #imageRepo

    constructor() {
        super();

        this.#pointsRepository = new PointsRepository();
        this.#scoreboardRepository = new ScoreboardRepository();
        // this.#imageRepo = new ImagesRepo();

        this.#setupView();
    }

    async #setupView() {

        this.#scoreboardView = await super.loadHtmlIntoContent("html_views/scoreboard.html")

        let labels = ['Username', 'Location', 'Score'];
        let objects = await this.#scoreboardRepository.get();
        objects.sort((a, b) => {
            return b.score - a.score;
        });
        ScoreboardController.#createScoreboard(labels, objects, document.getElementById('scoreboard'))

        this.buttonMeanOfTransport();
        this.prize();
        this.sortByName();
    }

    /**
     * Async function that gets, updates and sets the score of the user
     *
     * @param points = the amount of point that gets added to the players score
     * @returns {Promise<void>}
     */
    async updatePoints(points){
        let userId = App.sessionManager.get("id");
        let userScore = await this.#pointsRepository.get(userId);
        let totalScore = userScore[0].score += points;
        this.#pointsRepository.set(totalScore, userId);
    }

    buttonMeanOfTransport() {
        console.log("ButtonMeansOfTransport functie word geladen")


        let content = document.getElementById("myContentDiv")
        const carScore = 1;
        const electricCarScore = 2;
        const ovScore = 3;
        const bikeScore = 4;
        const walkScore = 5;
        let points;
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
            if (event.target === content) {
                content.style.display = "none";
            }
        }

        // Confirm whether you want to choose the corresponding vehicle
        const secondModalContent = document.querySelector(".second_modal_content");
        const closeWindowConfirm = document.querySelector("#closeWindowConfirm");
        const transport = document.querySelectorAll(
            '#transport1, #transport2, #transport3, #transport4, #transport5');

        // todo Robberto dit is de button voor uwe userstory doe er wat leuks mee
        const buttonConfirm = document.querySelector("#confirmBtn");


        let image1 = new Image();
        let image2 = new Image();
        let image3 = new Image();
        let image4 = new Image();
        let image5 = new Image();

        let test = [image1, image2, image3, image4, image5]
        for (let i = 0; i < test.length; i++) {
                test[i].style.maxWidth = "200px";
                test[i].style.maxHeight = "200px";
        }

        image1.src = "assets/Media/auto.png";
        image2.src = "assets/Media/elektrischeAuto.png";
        image3.src = "assets/Media/trein.png";
        image4.src = "assets/Media/fiets.png";
        image5.src = "assets/Media/lopend.png";

        closeWindowConfirm.addEventListener('click', closeModalConfirm);
        buttonConfirm.addEventListener("click", evt => {
            this.updatePoints(points);
        });

        for (let i = 0; i < transport.length; i++) {
            transport[i].addEventListener("click", callModal2)
        }

        const images = [image1, image2, image3, image4, image5];

        function removeChildren() {
            for (let i = 0; i < images.length; i++) {
                if (images[i] !== event.target.id && images[i]) {
                    images[i].remove();
                }
            }
        }

        function addingChildren() {
            switch (event.target.id) {
                case transport[0].id:
                    secondModalContent.appendChild(images[0]);
                    points = carScore;
                    break;
                case transport[1].id:
                    secondModalContent.appendChild(images[1]);
                    points = electricCarScore;
                    break;
                case transport[2].id:
                    secondModalContent.appendChild(images[2]);
                    points = ovScore;
                    break;
                case transport[3].id:
                    secondModalContent.appendChild(images[3]);
                    points = bikeScore;
                    break;
                case transport[4].id:
                    secondModalContent.appendChild(images[4]);
                    points = walkScore;
                    break;
            }
        }

        function callModal2() {
            secondModalContent.style.display = "block";
            removeChildren();
            addingChildren();
            secondModalContent.appendChild(buttonConfirm);
        }

        function closeModalConfirm() {
            secondModalContent.style.display = "none";
        }

        function offClickModal2(event) {
            if (event.target === content) {
                secondModalContent.style.display = "none";
            }
        }

        window.addEventListener("click", offClickModal2)

    }

    prize() {
        const button = document.getElementById("myBtn")
        button.addEventListener("click", callModal)

        let prizeModal = document.getElementById("prizeModal")
        let prizePopup = document.querySelector("#popup-prize")
        prizePopup.style.display = "block";
        let prizes = document.querySelector(".modal-content")
        let popup = document.querySelector(".popup");

        var img = document.createElement("img");
        var src = document.getElementById("popup-prize");

        const close = document.getElementsByClassName("close")[0];
        close.addEventListener("click", closeModal)

        window.addEventListener("click", offClickModal)


        document.getElementById("prize1").onmouseover = function () {
            popup.style.display = "block";
            prizes.style.display = "block";
            img.src = "https://pbs.twimg.com/profile_images/1284476346/vakantie_reasonably_small.gif";
            src.appendChild(img);
        }

        document.getElementById("prize1").onmouseleave = function () {
            popup.style.display = "none";
        }


        document.getElementById("prize2").onmouseover = function () {
            popup.style.display = "block";
            prizes.style.display = "block";
            img.src = "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/vslgdggkdt7kbg1ycqab";
            src.appendChild(img);
        }

        document.getElementById("prize2").onmouseleave = function () {
            popup.style.display = "none";
        }

        document.getElementById("prize3").onmouseover = function () {
            popup.style.display = "block";
            prizes.style.display = "block";
            img.src = "https://pbs.twimg.com/profile_images/51457981/koffie_3__reasonably_small.gif";
            src.appendChild(img);
        }

        document.getElementById("prize3").onmouseleave = function () {
            popup.style.display = "none";
        }


        function callModal() {
            console.log("prize button geklikt")
            prizeModal.style.display = "block";
            prizes.style.display = "block";

        }

        function closeModal() {
            console.log("X is geklikt")
            prizeModal.style.display = "none";
        }

        function offClickModal(event) {
            if (event.target === prizeModal) {
                prizeModal.style.display = "none";
            }
        }


    }

    sortByName() {
        const sortBtn = document.getElementById('sort-btn');

        //change this selector to the class/id of the table
        let compList = document.getElementById("tablebody");

        let nameRow = 1;

        sortBtn.addEventListener("click", () => {
            //Chane the col selector to the column that the names are in
            sort_table(compList, 0, nameRow);
            nameRow *= -1;
        })

        function sort_table(tbody, col, asc) {
            let rows = tbody.rows
            let rlen = rows.length
            let arr = new Array()

            // fill the array with values from the table
            for (let i = 0; i < rlen; i++) {
                let cells = rows[i].cells;
                let clen = cells.length;
                arr[i] = new Array();
                for (let j = 0; j < clen; j++) {
                    arr[i][j] = cells[j].innerHTML;
                }
            }
            // sort the array by the specified column number (col) and order (asc)
            arr.sort(function (a, b) {
                return (a[col] == b[col]) ? 0 : ((a[col] > b[col]) ? asc : -1 * asc);
            });
            // replace existing rows with new rows created from the sorted array
            for (let i = 0; i < rlen; i++) {
                arr[i] = "<td>" + arr[i].join("</td><td>") + "</td>";
            }
            tbody.innerHTML = "<tr>" + arr.join("</tr><tr>") + "</tr>";
        }
    }


    static #createScoreboard(labels, objects, container) {
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        table.classList.add("table");
        thead.classList.add("tablehead");
        tbody.classList.add("tablebody");
        tbody.setAttribute("id", "tablebody")

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
