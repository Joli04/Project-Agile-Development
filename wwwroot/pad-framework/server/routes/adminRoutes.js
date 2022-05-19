// class AdminRoutes{
//     #app;
//     #databaseHelper = require("../framework/utils/databaseHelper");
//     #errorCodes = require("../framework/utils/httpErrorCodes");
//
//     constructor(app) {
//         this.#app = app;
//         this.#getAdmin();
//     }
//
//     #getAdmin(){
//         this.#app.get("/admin", async (req, res) => {
//
//             try {
//                 const data = await this.#databaseHelper.handleQuery({
//                     query: "SELECT username FROM users WHERE admin = 1"
//                 });
//                 console.log(data)
//                 res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
//             }catch(e){
//                 res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e});
//             }
//         });
//     }
// }
//
// module.exports = AdminRoutes;