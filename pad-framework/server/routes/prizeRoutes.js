/**
 *
 */
class PrizeRoutes {
    #errorCodes = require('../framework/utils/httpErrorCodes');
    #databaseHelper = require('../framework/utils/databaseHelper');
    #app

    /**
     *
     * @param app
     */
    constructor(app) {
        this.#app = app;
        this.#getPrizes1();
        this.#updatePrizes();
    }

    /**
     * Get values from the table prize.
     */
    #getPrizes1() {
        this.#app.get("/prize", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT * FROM `prize` WHERE active = ? ORDER BY sort ASC, `value` DESC",
                    values: [1]
                });
                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e})
            }
        });
    }

    /**
     *
     * Updates all the selected prizes.
     */
    async #updatePrizes() {
        this.#app.post("/prize/:textprize1/:textprize2/:textprize3/:value", async (req, res) => {

            const value = req.params.value;

            const textprize1 = req.params.textprize1;
            const textprize2 = req.params.textprize2;
            const textprize3 = req.params.textprize3;

            let data;
            let id = 1;

            const array = [textprize1, textprize2, textprize3]

            if (value === "yearly") {
                try {
                    for (let i = 0; i < array.length; i++) {
                        data = await this.#databaseHelper.handleQuery({
                            query: "UPDATE prize SET image_description = ? WHERE id_prize =  ?",
                            values: [array[i], id]
                        })
                        id++;
                    }
                    res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
                } catch (e) {
                    res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e})
                }
            } else {
                try {
                    id = 4;
                    for (let i = 0; i < array.length; i++) {
                        data = await this.#databaseHelper.handleQuery({
                            query: "UPDATE prize SET image_description = ? WHERE id_prize =  ?",
                            values: [array[i], id]
                        })
                        id++;
                    }
                    res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
                } catch (e) {
                    res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e})
                }
            }

        });
    };
}

module.exports = PrizeRoutes;