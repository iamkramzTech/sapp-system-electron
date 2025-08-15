// const { ipcMain } = require('electron');
const { safeHandle } = require("../utils/safeHandle");
const {
  authenticateUser,
  getSession,
  logout,
} = require("../services/authService");
const { CHANNELS } = require("../../shared/constants");
const { databaseConnection } = require("../db");
const bcrypt = require("bcrypt");

function adminUnlockUserHandler() {
  safeHandle(CHANNELS.ADMIN_UNLOCK_USER, async (event, { userId }) => {
    await databaseConnection
      .promise()
      .query(
        "UPDATE tblusers SET login_attempts = 0, account_locked = false, locked_until = null WHERE user_id = ?",
        [userId]
      );

    return { success: true };
  });
}
function loginUserHandler() {
  safeHandle(CHANNELS.USER_LOGIN, async (event, creds) =>
    authenticateUser(creds.email, creds.password)
  );
}

function adminLoginHandler() {
  safeHandle(CHANNELS.ADMIN_LOGIN, async (event, creds) =>
    authenticateUser(creds.email, creds.password, "admin")
  );
}

function logoutHandler() {
  safeHandle(CHANNELS.LOGOUT, () => logout());
}

function getSessionHandler() {
  safeHandle(CHANNELS.GET_SESSION, () => getSession());
}

function getUsersHandler() {
  //Display on admin datatable role=user
  safeHandle(CHANNELS.GET_USERS, async () => {
    const [data] = await databaseConnection
      .promise()
      .query(
        `SELECT user_id, full_name, email_address, roles, login_attempts, account_locked, locked_until FROM tblusers WHERE roles = 'user'`
      );

    return { success: true, user: data };
  });
}

// ipcMain.handle('delete-user', async (event, id) => {
//   await db.promise().query('DELETE FROM users WHERE user_id = ?', [id]);
//   return { success: true };
// });

function registerUserHandler() {
  safeHandle(
    CHANNELS.REGISTER_USER,
    async (event, { fullName, email, password }) => {
      try {
        const [existingUsers] = await databaseConnection
          .promise()
          .query("SELECT * FROM tblusers WHERE email_address = ?", [email]);
        if (existingUsers.length > 0) {
          return {
            success: false,
            message: "Email Address already registered",
          };
        }

        //Passord Hashing using bcrypt
        /* set saltRounds to 12 for more secured hashing */
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const [insertResult] = await databaseConnection
          .promise()
          .query(
            "INSERT INTO tblusers(full_name, email_address, hashed_password) VALUES(?,?, ?)",
            [fullName, email, hashedPassword]
          );
        return {
          success: true,
          message: "New User has been added",
          userId: insertResult.insertId,
        };
      } catch (error) {
        console.error("Registration error:", error);
        return { success: false, message: "Registration failed" };
      }
    }
  );
}
module.exports = {
  adminUnlockUserHandler,
  adminLoginHandler,
  loginUserHandler,
  logoutHandler,
  getSessionHandler,
  getUsersHandler,
  registerUserHandler,
};
