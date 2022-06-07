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
        this.#updatePrizes();
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
    async#updatePrizes(){
        this.#app.get("/prize/:textprize1/:textprize2/:textprize3/:waarde", async (req, res) => {
            const waarde = req.params.waarde;

            const textprize1 = req.params.textprize1;
            const textprize2 = req.params.textprize2;
            const textprize3 = req.params.textprize3;

            let changeprize1;
            let changeprize2;
            let changeprize3;


            if (waarde === "yearly"){
                try{
                    changeprize1 = await this.#databaseHelper.handleQuery({
                        query: "UPDATE prize SET image_description = ? WHERE id_prize =  ?;",
                        values:[textprize1,1]
                    })

                    changeprize2 = await this.#databaseHelper.handleQuery({
                        query: "UPDATE prize SET image_description = ? WHERE id_prize =  ?;",
                        values:[textprize2,2]
                    })

                    changeprize3 = await this.#databaseHelper.handleQuery({
                        query: "UPDATE prize SET image_description = ? WHERE id_prize =  ?;",
                        values:[textprize3,5]
                    });
                    res.status(this.#errorCodes.HTTP_OK_CODE).json(changeprize1,changeprize2,changeprize3);
                } catch (e) {
                    res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e})
                }
            }
            else{
                try{
                    changeprize1 = await this.#databaseHelper.handleQuery({
                        query: "UPDATE prize SET image_description = ? WHERE id_prize =  ?;",
                        values:[textprize1,6]
                    })

                    changeprize2 = await this.#databaseHelper.handleQuery({
                        query: "UPDATE prize SET image_description = ? WHERE id_prize =  ?;",
                        values:[textprize2,4]
                    })

                    changeprize3 = await this.#databaseHelper.handleQuery({
                        query: "UPDATE prize SET image_description = ? WHERE id_prize =  ?;",
                        values:[textprize3,3]
                    });
                    res.status(this.#errorCodes.HTTP_OK_CODE).json(changeprize1,changeprize2,changeprize3);
                } catch (e) {
                    res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e})
                }
            }

        });
    };
}

module.exports = PrizeRoutes;