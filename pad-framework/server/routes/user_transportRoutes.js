class UserTransportRoutes {
    #errorCodes = require('../framework/utils/httpErrorCodes');
    #databaseHelper = require('../framework/utils/databaseHelper');
    #app

    constructor(app) {
        this.#app = app;
        this.#insertUserTransportCheck();
        this.#getUserTransport();
        this.#updateFrequency();
        this.#getVehicleFrequency();
    }

    /**
     * Get all the data from table user_transport1 where date value equals today's date
     */
    #getUserTransport() {
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

    #getVehicleFrequency() {
        this.#app.get("/user_transport1/:id/:vehicleType", async (req, res) => {
            let userId = req.params.id;
            let vehicleType = req.params.vehicleType;

            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: `SELECT CASE "${vehicleType}"
                                       WHEN 'car' THEN u.frequency_car
                                       WHEN 'e-car' THEN u.frequency_e_car
                                       WHEN 'bike' THEN u.frequency_bike
                                       WHEN 'walk' THEN u.frequency_walk
                                       WHEN 'public_transport' THEN u.frequency_public_transport END AS frequency
                            FROM users u
                            WHERE id = ?`,
                    values: [userId]
                });
                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e})
            }
        })
    }

    #updateFrequency() {
        this.#app.put("/user_transport1/:id_user_transport/:vehicleType/:frequency", async (req, res) => {
            let userId = req.params.id_user_transport;
            let vehicleType = req.params.vehicleType;
            let frequency = req.params.frequency;

            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: `UPDATE users u
                            SET u.frequency_car = CASE
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
                    values: [userId]
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
    #insertUserTransportCheck() {
        this.#app.put("/user_transport1/:id_user_transport", async (req, res) => {
            let id_user = req.params.id_user_transport;
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "CALL checkUnique(NULL,?,CURRENT_DATE) ",
                    values: [id_user]
                });
                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e})
            }
        })
    }
}

module.exports = UserTransportRoutes;