const { adminUnlockUserHandler, adminLoginHandler, loginUserHandler, logoutHandler, getSessionHandler, getUsersHandler, registerUserHandler } = require("./userHandler");
const { addParishionerHandler, getParishionersHandler, getParishionersByIDHandler } = require('./parishionerHandler')

 function registerAllHandlers() {
    loginUserHandler();
    adminLoginHandler();
    adminUnlockUserHandler();
    logoutHandler();
    getSessionHandler();
    getUsersHandler();
    registerUserHandler();

    addParishionerHandler();
    getParishionersHandler();
    getParishionersByIDHandler();
}

module.exports = { registerAllHandlers }