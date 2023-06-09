class pointsRoute {
    #app;
    #databaseHelper = require("../framework/utils/databaseHelper");
    #errorCodes = require("../framework/utils/httpErrorCodes");

    constructor(app) {
        this.#app = app;
        this.#getPoints();
        this.#setScore();
    }

    #setScore() {
        this.#app.post("/points/:id", async (req, res) => {
            const id = req.params.id;
            const score = req.body.score;

            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: `UPDATE users u SET score = ? WHERE id = ? `,
                    values: [score, id]
                });
                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);

            } catch (e) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }

    #getPoints() {
        this.#app.get("/points/:id", async (req, res) => {

            const id = req.params.id;
            const vehicleType = req.params.vehicleType;


            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: `SELECT score FROM users u WHERE id = ?`,
                    values: [id]
                });

                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }
}

module.exports = pointsRoute;
