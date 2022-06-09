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
            this.#prizeView.querySelector("#month").style.display = 'block';
            this.#prizeView.querySelector("#year").style.display = 'block';
        } else {
            this.#prizeView.querySelector("#month").style.display = 'none';
            this.#prizeView.querySelector("#year").style.display = 'none';
        }
        await this.#edit(object)
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

    // async update() {
    //
    // }
    async #edit(object) {
        const editbuttonyear = this.#prizeView.querySelector("#year");
        const editbuttonmonth = this.#prizeView.querySelector("#month");
        const modaltitle = this.#prizeView.querySelector("#modaltitle");
        const modal = this.#prizeView.querySelector(".modal");
        const confirm = this.#prizeView.querySelector("#confirm");
        const cancel = this.#prizeView.querySelector("#cancel")
        let waarde = "";


        editbuttonyear.addEventListener("click", () => {
            waarde = editbuttonyear.value;
            modaltitle.innerHTML = "Change the prizes yearly!"
            modal.style.display = "block";
            console.log(object)
        })

        editbuttonmonth.addEventListener("click", () => {
            waarde = editbuttonmonth.value;
            modaltitle.innerHTML = "Change the prizes monthly!"
            modal.style.display = "block";
        })


        confirm.addEventListener("click", async () => {

            let textprize1 = this.#prizeView.querySelector("#textprize1").value;
            let textprize2 = this.#prizeView.querySelector("#textprize2").value;
            let textprize3 = this.#prizeView.querySelector("#textprize3").value;


            if (waarde === "yearly") {
                if (textprize1.length === 0) {
                    const obj = object[0].image_description
                    let string = JSON.stringify(obj)
                    let stringtextprize1 = string.slice(1, -1)
                    console.log(stringtextprize1)
                    textprize1 = stringtextprize1;
                }

                if (textprize2.length === 0) {
                    const obj = object[1].image_description
                    let string = JSON.stringify(obj)
                    let stringtextprize2 = string.slice(1, -1)
                    console.log(stringtextprize2)
                    textprize2 = stringtextprize2;
                }

                if (textprize3.length === 0) {
                    const obj = object[2].image_description
                    let string = JSON.stringify(obj)
                    let stringtextprize3 = string.slice(1, -1)
                    console.log(stringtextprize3)
                    textprize3 = stringtextprize3;
                }

                await this.#prizeRepository.settextprize(textprize1, textprize2, textprize3, waarde);
                modal.style.display = "none";
                // window.location.reload(true)
            } else {
                if (textprize1.length === 0) {
                    const obj = object[3].image_description
                    let string = JSON.stringify(obj)
                    let stringtextprize1 = string.slice(1, -1)
                    console.log(stringtextprize1)
                    textprize1 = stringtextprize1;
                }

                if (textprize2.length === 0) {
                    const obj = object[4].image_description
                    let string = JSON.stringify(obj)
                    let stringtextprize2 = string.slice(1, -1)
                    console.log(stringtextprize2)
                    textprize2 = stringtextprize2;
                }

                if (textprize3.length === 0) {
                    const obj = object[5].image_description
                    let string = JSON.stringify(obj)
                    let stringtextprize3 = string.slice(1, -1)
                    console.log(stringtextprize3)
                    textprize3 = stringtextprize3;
                }

                await this.#prizeRepository.settextprize(textprize1, textprize2, textprize3, waarde);
                modal.style.display = "none";
                // window.location.reload(true)
            }

            const fileImage1 = this.#prizeView.querySelector("#image1");
            const fileImage2 = this.#prizeView.querySelector("#image2");
            const fileImage3 = this.#prizeView.querySelector("#image3");

            const error = this.#prizeView.querySelector(".error_image");
            const formData = new FormData()

            let img1file = fileImage1.files[0];
            let img2file = fileImage2.files[0];
            let img3file = fileImage3.files[0];

            let fileNameImage1;
            let fileNameImage2;
            let fileNameImage3;


                console.log(fileImage1.files.length)
                console.log(fileImage2.files.length)
                console.log(fileImage3.files.length)

            const length1 = fileImage1.files.length;
            const length2 = fileImage2.files.length;
            const length3 = fileImage3.files.length;

                if (length1 !== 0) {
                    fileNameImage1 = fileImage1.files[0].name;
                    formData.append("image1", img1file, `${fileNameImage1}`)
                }

                if (length2 !== 0) {
                    fileNameImage2 = fileImage2.files[0].name
                    formData.append("image2", img2file, `${fileNameImage2}`)
                }

                if(length3 !== 0) {
                    fileNameImage3 = fileImage3.files[0].name
                    formData.append("image3", img3file, `${fileNameImage3}`)
                }

            console.log(formData)
            try {
                const response = await this.#prizeRepository.setNewImage(waarde, formData);
                console.log(response)

            } catch (e) {
                console.error(e);
            }
        })

        cancel.addEventListener("click", () => {
            modal.style.display = "none";
        })


    }
}