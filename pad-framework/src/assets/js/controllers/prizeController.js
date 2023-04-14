import {Controller} from "./controller.js";
import {PrizeRepository} from "../repositories/prizeRepository.js";
import {App} from "../app.js";

export class PrizeController extends Controller {
    #prizeView
    #prizeRepository


    constructor() {
        super()
        this.#prizeRepository = new PrizeRepository();
        this.#setupView();
    }

    async #setupView() {
        let object = await this.#prizeRepository.get();
        this.#prizeView = await super.loadHtmlIntoContent("html_views/prize.html")

        if (App.sessionManager.get("admin") === 1) {
            this.#prizeView.querySelector(".editbuttonmonthly").style.display = 'block';
            this.#prizeView.querySelector(".editbuttonyearly").style.display = 'block';
        } else {
            this.#prizeView.querySelector("#month").style.display = 'none';
            this.#prizeView.querySelector("#year").style.display = 'none';
        }
        await this.#edit(object)
        await this.#check()
        this.#showPrizes(object);
    }

    /**
     * Method to show the prize to the user
     * @param object from the database
     */
    #showPrizes(object) {
        let prizes = this.#prizeView.querySelectorAll(
            "#prize1, #prize2, #prize3, #prize1_monthly, #prize2_monthly, #prize3_monthly");
        for (let i = 0; i < prizes.length; i++) {
            let img = new Image();
            img.src = object[i].image_link;
            img.style.width = "65px";
            img.style.height = "60px";
            img.style.marginLeft = "20px";
            prizes[i].append(object[i].image_description);
            prizes[i].append(img);
        }
    }


    async #edit(object) {

        let textprize1;
        let textprize2;
        let textprize3;
        let value = "";

        const editbuttonyear = this.#prizeView.querySelector(".editbuttonyearly");
        const editbuttonmonth = this.#prizeView.querySelector(".editbuttonmonthly");
        const modaltitle = this.#prizeView.querySelector("#modaltitle");
        const modal = this.#prizeView.querySelector(".modal");
        const confirm = this.#prizeView.querySelector("#confirm");
        const cancel = this.#prizeView.querySelector("#cancel")


        editbuttonyear.addEventListener("click", () => {
            value = editbuttonyear.value;
            modaltitle.innerHTML = "Change the prizes yearly!"
            modal.style.display = "block";
            console.log(object)
        })

        editbuttonmonth.addEventListener("click", () => {
            value = editbuttonmonth.value;
            modaltitle.innerHTML = "Change the prizes monthly!"
            modal.style.display = "block";
        })


        confirm.addEventListener("click", async () => {

            textprize1 = this.#prizeView.querySelector("#textprize1").value;
            textprize2 = this.#prizeView.querySelector("#textprize2").value;
            textprize3 = this.#prizeView.querySelector("#textprize3").value;

            const array = [textprize1, textprize2, textprize3]
            const array_length = array.length;
            let id = 0;

            if (value !== "yearly") {
                id = 3;
            }

            await this.#check(array, array_length, object, id)
            textprize1 = array[0]
            textprize2 = array[1]
            textprize3 = array[2]
            await this.#prizeRepository.settextprize(textprize1, textprize2, textprize3, value);
            modal.style.display = "none";
            window.location.reload(true)
        })

        cancel.addEventListener("click", () => {
            modal.style.display = "none";
        })
    }

    async #check(array, array_length, object, id) {
        let obj;
        let string;

        for (let i = 0; i < array_length; i++) {
            if (array[i].length === 0) {
                obj = object[id].image_description
                string = JSON.stringify(obj)
                array[i] = string.slice(1, -1)
            }
            else if (array[i].length === 1 && array[i] === " ") {
                // let number_prize = i+1;
                // alert("You can't just enter a space for prize "+number_prize+"\nTry again!")
                 alert("You cannot enter just a space for prize.")
                obj = object[id].image_description
                string = JSON.stringify(obj)
                array[i] = string.slice(1, -1)
            }
            id++
        }
    }
}

