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
            const vehicleType = req.body.vehicleType;
            const frequency = req.body.frequency;
            const score = req.body.score;

            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: `UPDATE users u
                            SET score = ?,
                                u.frequency_car = CASE
                                    WHEN "${vehicleType}" = 'car' THEN "${frequency}"
                                    ELSE u.frequency_car END,
                                u.frequency_e_car = CASE
                                    WHEN "${vehicleType}" = 'e-car' THEN "${frequency}"
                                    ELSE u.frequency_e_car END,
                                u.frequency_bike = CASE
                                    WHEN "${vehicleType}" = 'bike' THEN "${frequency}"
                                    ELSE u.frequency_bike END,
                                u.frequency_walk = CASE
                                    WHEN "${vehicleType}" = 'walk' THEN "${frequency}"
                                    ELSE u.frequency_walk END,
                                u.frequency_public_transport = CASE
                                    WHEN "${vehicleType}" = 'public_transport'
                                    THEN "${frequency}"
                                    ELSE u.frequency_public_transport END
                            WHERE id = ? `,
                    values: [score, id]
                });
                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);

            } catch (e) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }

    #getPoints() {
        this.#app.get("/points/:id/:vehicleType", async (req, res) => {

            const id = req.params.id;
            const vehicleType = req.params.vehicleType;


            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: `SELECT score,
                                   CASE "${vehicleType}"
                                       WHEN 'car' THEN u.frequency_car
                                       WHEN 'e-car' THEN u.frequency_e_car
                                       WHEN 'bike' THEN u.frequency_bike
                                       WHEN 'walk' THEN u.frequency_walk
                                       WHEN 'public_transport' THEN u.frequency_public_transport END AS frequency
                            FROM users u
                            WHERE id = ?`,
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