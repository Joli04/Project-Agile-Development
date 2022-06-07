class UserTransportRoutes {
    #errorCodes = require('../framework/utils/httpErrorCodes');
    #databaseHelper = require('../framework/utils/databaseHelper');
    #app

    constructor(app) {
        this.#app = app;
        this.#insertUserTransportCheck();
        this.#getUserTransport();
    }

    /**
     * Get all the data from table user_transport1 where date value equals today's date
     */
    #getUserTransport(){
        this.#app.get("/user_transport1", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT * FROM user_transport1 WHERE transport_date = CURRENT_DATE ",
                });
                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e})
            }
        })
    }

    /**
     * Call the stored procedure, and check whether to insert data or not
     */
    #insertUserTransportCheck(){
        this.#app.put("/user_transport1/:id_user_transport", async (req, res) => {
            let id_user = req.params.id_user_transport;
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "CALL checkUnique(NULL,?,CURRENT_DATE) ",
                    values:[id_user]
                });
                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e})
            }
        })
    }
}

module.exports = UserTransportRoutes;