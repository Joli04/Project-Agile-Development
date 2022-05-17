class BadgesRoutes{
    #app;
    #databaseHelper = require("../framework/utils/databaseHelper");
    #errorCodes = require("../framework/utils/httpErrorCodes");

    constructor(app) {
        this.#app = app;
        this.#getBadges();
        this.#updateBadges();
    }

    #getBadges(){
        this.#app.get("/badges", async (req, res) => {

            const getId = req.params.id;

            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT * FROM badges"
                });

                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            }catch(e){
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }

    #updateBadges(){
        this.#app.post("/badges", async (req, res) => {
            let waarde1 = req.body.params;

            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "UPDATE `badges` SET `badge_achieved`= 1"
                });

                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            }catch(e){
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }
}

module.exports = BadgesRoutes;