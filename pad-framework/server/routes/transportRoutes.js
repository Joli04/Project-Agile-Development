class TransportRoutes {
    #errorCodes = require('../framework/utils/httpErrorCodes');
    #databaseHelper = require('../framework/utils/databaseHelper');
    #app

    constructor(app) {
        this.#app = app;
        this.#getPoints();
        this.#setFirstLogin();
    }

    /**
     * Get all the values in the column point from table transport.
     */
    #getPoints() {
        this.#app.get("/transport", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT * FROM transport",
                });
                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e})
            }
        })
    }

    #setFirstLogin() {
        this.#app.put("/transport/is_first_login/:id", async (req, res) => {
            const id = req.params.id;
            const is_first_login = req.body.is_first_login;

            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "UPDATE users SET is_first_login = ? WHERE id = ?",
                    values: [0, id]
                });
                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e})
            }
        })
    }
}

module.exports = TransportRoutes;
