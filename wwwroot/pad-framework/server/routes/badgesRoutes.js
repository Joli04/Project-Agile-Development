class BadgesRoutes{
    #app;
    #databaseHelper = require("../framework/utils/databaseHelper");
    #errorCodes = require("../framework/utils/httpErrorCodes");

    constructor(app) {
        this.#app = app;
        this.#getBadges();
    }

    #getBadges(){
        this.#app.get("/badges/:id", async (req, res) => {
            const getId = req.params.id;
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT b.*, ub.badge_seen " +
                        "FROM badges AS b " +
                        "LEFT JOIN user_badge AS ub ON ub.id_user = ? " +
                        "AND ub.id_badge = b.id_badge " +
                        "GROUP BY 1",
                    values: [getId]

                    // SELECT f.name, f.price, f.options, fm.food_menu
                    // FROM food AS f
                    // JOIN food_menu AS fm ON fm.food_id = f.food_id

                });

                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            }catch(e){
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }
}

module.exports = BadgesRoutes;