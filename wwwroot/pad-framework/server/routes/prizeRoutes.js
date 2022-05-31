/**
 *
 */
class PrizeRoutes {
    #errorCodes = require('../framework/utils/httpErrorCodes');
    #databaseHelper = require('../framework/utils/databaseHelper');
    #app

    constructor(app) {
        this.#app = app;
        this.#getPrizes();
    }


    /**
     * Get values from the table prize.
     */
    #getPrizes() {
        this.#app.get("/prize", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT * FROM `prize` WHERE `active` = ? " +
                        "ORDER BY `sort` ASC, " +
                        "CASE  " +
                        "  WHEN `id_prize` = ? THEN 1 " +
                        "  WHEN `id_prize` = ? THEN 2 " +
                        " ELSE 3 " +
                        "END, " +
                        "`id_prize` DESC",
                    values:[1,1,2]
                });
                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e})
            }
        });
    }
}

module.exports = PrizeRoutes;