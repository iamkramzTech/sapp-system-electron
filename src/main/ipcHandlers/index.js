const { adminUnlockUserHandler, adminLoginHandler, loginUserHandler, logoutHandler, getSessionHandler, getUsersHandler, registerUserHandler } = require("./userHandler");

 function registerAllHandlers() {
    loginUserHandler();
    adminLoginHandler();
    adminUnlockUserHandler();
    logoutHandler();
    getSessionHandler();
    getUsersHandler();
    registerUserHandler();
}

module.exports = { registerAllHandlers }