import {Controller} from "./controller.js";
import {TransportRepository} from "../repositories/transportRepository.js";
import {PrizeRepository} from "../repositories/prizeRepository.js";
import {PointsRepository} from "../repositories/pointsRepository.js";
import {App} from "../app.js";

export class PrizeTransportController extends Controller {

    #prizeView
    #transportRepository
    #prizeRepository
    #pointsRepository

    constructor() {
        super()
        this.#transportRepository = new TransportRepository();
        this.#prizeRepository = new PrizeRepository();
        this.#pointsRepository = new PointsRepository();
        this.#setupView();

    }

    /**
     * load the html document before the methods.
     * @returns {Promise<void>}
     */
    async #setupView() {

        this.#prizeView = await super.loadHtmlIntoContent("html_views/prize.html")
        this.#showPrizeModal();
        this.#showTransportModal();
        this.#prizeContent();
        this.#transportContent();
        this.#transportConformation();
    }

    /**
     * if you click outside of the modal, it closes.
     */
    #offClickModal() {
        let modal = document.querySelector(".modal");
        for (let i = 0; i < modal.length; i++) {
            modal[i].hidden = true;
        }

        function offClickModal(event) {
            if (event.target === modal) {
                console.log("offClickModal() clicked")
                modal.style.display = "none";
            }
        }

        window.addEventListener("click", offClickModal);
    }

    /**
     * the prize modal is shown.
     */
    #showPrizeModal() {
        const prizePopup = document.querySelector("#prize_popup");
        const closeBtnPopup = document.querySelector(".close_prize_popup");
        const btnPopup = document.querySelector(".btn_prize_popup");

        btnPopup.addEventListener("click", () => {
            prizePopup.style.display = "block";
        })

        closeBtnPopup.addEventListener("click", () => {
            prizePopup.style.display = "none";
        })
        this.#offClickModal();
    }

    /**
     * the prize modal content is shown
     */
    #prizeContent() {
        let popup = document.querySelector(".popup");
        let img = document.createElement("img");
        let src = document.getElementById("popup-prize");

        document.getElementById("prize1").onmouseover = function () {
            popup.style.display = "block";
            img.src = "https://pbs.twimg.com/profile_images/1284476346/vakantie_reasonably_small.gif";
            src.append(img);
            img.style.boxShadow = "10px 10px 10px grey";
        }

        document.getElementById("prize1").onmouseleave = function () {
            popup.style.display = "none";
        }

        document.getElementById("prize2").onmouseover = function () {
            popup.style.display = "block";
            img.src = "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/vslgdggkdt7kbg1ycqab";
            src.append(img);
            img.style.boxShadow = "10px 10px 10px grey";
            img.style.marginBottom = "50px";
        }

        document.getElementById("prize2").onmouseleave = function () {
            popup.style.display = "none";
        }

        document.getElementById("prize3").onmouseover = function () {
            popup.style.display = "block";
            img.src = "https://pbs.twimg.com/profile_images/51457981/koffie_3__reasonably_small.gif";
            src.append(img);
            img.style.boxShadow = "10px 10px 10px grey";
        }

        document.getElementById("prize3").onmouseleave = function () {
            popup.style.display = "none";
        }
    }

    /**
     * Show and close transport modal.
     */
    #showTransportModal() {
        const vehiclePopup = document.querySelector("#vehiclePopup");
        const closeButtonPopup = document.querySelector(".closePopup");
        const buttonPopup = document.querySelector(".btn_transport_popup");
        buttonPopup.addEventListener("click", () => {
            vehiclePopup.style.display = "block";
        })

        closeButtonPopup.addEventListener("click", () => {
            vehiclePopup.style.display = "none";
        })
        this.#offClickModal();
    }

    /**
     * make sure the transport modal content is shown.
     */
    #transportContent() {
        const totalBtn = document.querySelectorAll(
            "#walking-button, #cycling-button, #scooter-button, #bus-button, #car-button");
        const modalTransportContent = document.querySelector(".modal_transport_content")
        const transport = document.querySelectorAll(
            '#transport1, #transport4, #transport3, #transport2, #transport5');

        for (let i = 0; i < totalBtn.length; i++) {
            totalBtn[i].addEventListener("click", () => {
                transportModalContent();
            })
        }

        function transportModalContent() {
            addChildren();
            modalTransportContent.style.display = "block";
            removeChildren();
        }

        function removeChildren() {
            for (let i = 0; i < totalBtn.length; i++) {
                // console.log(totalBtn[i].id !== event.target.id);
                if (totalBtn[i].id !== event.target.id) {
                    transport[i].remove();
                }
            }
        }

        function addChildren() {
            for (let i = 0; i < totalBtn.length; i++) {
                // console.log(totalBtn[i].id !== event.target.id);
                modalTransportContent.appendChild(transport[i]);
            }
        }
    }

    /**
     * Async function that gets, updates and sets the score of the user
     *
     * @param points = the amount of point that gets added to the players score
     * @returns {Promise<void>}
     */
    async updatePoints(points) {
        let userId = App.sessionManager.get("id");
        let userScore = await this.#pointsRepository.get(userId);
        console.log(userScore)
        let totalScore = userScore[0].score += points;

        // switch (vehicleType){
        //     case "car":
        //         break
        //     case ""
        // }

        this.#pointsRepository.set(totalScore, userId);
    }

    /**
     * Method that confirms your vehicle choice, and give the option to cancel.
     */
    #transportConformation() {
        const cancelBtn = document.querySelector(".btn-danger");
        const confirmBtn = document.querySelector(".btn-success");
        const modalTransportContent = document.querySelector(".modal_transport_content");
        const errorMsg = document.querySelector(".errorMsg");
        let transports = document.getElementsByName('vehicle-option');

        cancelBtn.addEventListener("click", () => {
            if (window.getComputedStyle(modalTransportContent).display === "none") {
                errorMsg.innerText = "Oeps, niks geselecteerd!";
                setTimeout(function () {
                    errorMsg.innerText = "";
                }, 2000);
            }
            modalTransportContent.style.display = "none";
        })

        confirmBtn.addEventListener("click", async (event) => {
            let score = await this.#transportRepository.get();
            // let points = 0;
            for (let i = 0; i < transports.length; i++) {
                if (transports[i].checked) {
                    console.log(score[i].point)
                    let vehicleType = transports[i].value;
                    await this.updatePoints(score[i].point);
                }
            }
        })
        // if(window.getComputedStyle(modalTransportContent).display === "block"){
        //     cancelBtn.style.display = "block";
        //     confirmBtn.style.display = "block";
        //     cancelBtn.addEventListener("click", () =>{
        //         modalTransportContent.style.display = "none";
        //     })
        // }

    }
}