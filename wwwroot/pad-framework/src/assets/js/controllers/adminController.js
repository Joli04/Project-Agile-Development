import {AdminRepository} from "../repositories/adminRepository.js";
import {Controller} from "./controller.js";

export class AdminController extends Controller {
    #adminView
    #adminRepository


    constructor() {
        super();

        this.#adminRepository = new AdminRepository();

        this.#setupView();
    }

    async #setupView() {

        this.#adminView = await super.loadHtmlIntoContent("html_views/admin.html")
    }

}
