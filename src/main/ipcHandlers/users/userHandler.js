import { ipcMain } from "electron";
import { databaseConnection } from "../../db.js";
import bcrypt from "bcrypt";

let currentUser = null; //{id, email, role}
ipcMain.handle("admin-unlock-user", async (event, { userId }) => {
  await databaseConnection
    .promise()
    .query(
      'UPDATE tblusers SET login_attempts = 0, account_locked = false, locked_until = null WHERE user_id = ?',
      [userId]
    );
    
  return { success: true };
});

ipcMain.handle("admin-login", async (event, { email, password }) => {
  const [results] = await databaseConnection
    .promise()
    .query(`SELECT * FROM tblusers WHERE email_address = ? AND roles = 'admin'`, [email]);
  if (results.length === 0)
    return { success: false, message: "Invalid Credentials" };
  const user = results[0];

  //check if account is locked
  const now = new Date();
  if (
    user.account_locked ||
    (user.locked_until && new Date(user.locked_until) > now)
  ) {
    return {
      success: false,
      message: "Account is temporarily locked. Try again later.",
    };
  }
  const maxAttempts = user.roles === "admin" ? 10 : 3;
  const lockTime = user.roles === "admin" ? 1 : 5; // in minutes
  let attempts = user.login_attempts + 1;
  let lockAccount = attempts >= maxAttempts;
  // check Password
  const match = await bcrypt.compare(password, user.hashed_password);
  if (!match) {
    await databaseConnection
      .promise()
      .query(
        'UPDATE tblusers SET login_attempts = ?, account_locked = ?, locked_until = ? WHERE user_id = ?',
        [
          attempts,
          lockAccount,
          lockAccount ? new Date(Date.now() + lockTime * 60000) : null, //lock minutes based on user roles
          user.user_id,
        ]
      );
    return {
      success: false,
      message: lockAccount
        ? `Too many failed attempts. Account locked for ${lockTime} minutes`
        : "Invalid Credentials",
    };
  }

  // Success: Reset attempts
  await databaseConnection
    .promise()
    .query(
      `UPDATE tblusers SET login_attempts = 0, account_locked = false, locked_until = null WHERE user_id = ?`,
      [user.user_id]
    );
  currentUser = { id: user.user_id, name: user.full_name, role: user.roles };
  return { success: true, message: "Login successful", user: currentUser };
});

ipcMain.handle("login-user", async (event, { email, password }) => {
  const [results] = await databaseConnection
    .promise()
    .query('SELECT * FROM tblusers WHERE email_address = ?', [email]);
  if (results.length === 0)
    return { success: false, message: "Invalid Credentials" };

  const user = results[0];

  //check if account is locked
  const now = new Date();
  if (
    user.account_locked ||
    (user.locked_until && new Date(user.locked_until) > now)
  ) {
    return {
      success: false,
      message: "Account is temporarily locked. Try again later.",
    };
  }
  const maxAttempts = user.roles === "admin" ? 10 : 3;
  const lockTime = user.roles === "admin" ? 1 : 5; // in minutes
  let attempts = user.login_attempts + 1;
  let lockAccount = attempts >= maxAttempts;
  // check Password
  const match = await bcrypt.compare(password, user.hashed_password);
  if (!match) {
    await databaseConnection
      .promise()
      .query(
        'UPDATE tblusers SET login_attempts = ?, account_locked = ?, locked_until = ? WHERE user_id = ?',
        [
          attempts,
          lockAccount,
          lockAccount ? new Date(Date.now() + lockTime * 60000) : null, //lock minutes based on user roles
          user.user_id,
        ]
      );
    return {
      success: false,
      message: lockAccount
        ? `Too many failed attempts. Account locked for ${lockTime} minutes`
        : "Invalid Credentials",
    };
  }
  // Success: Reset attempts
  await databaseConnection
    .promise()
    .query(
      'UPDATE tblusers SET login_attempts = 0, account_locked = false, locked_until = null WHERE user_id = ?',
      [user.user_id]
    );
  currentUser = { id: user.user_id, name: user.full_name, role: user.roles };
  return { success: true, message: "Login successful", user: currentUser };
});

ipcMain.handle("logout", () => {
  currentUser = null;
  return { success: true, message: "Logout Bye.." };
});

ipcMain.handle("get-session", () => {
  return currentUser;
});

//Display on admin datatable role=user
ipcMain.handle("get-users", async () => {
  const [data] = await databaseConnection
    .promise()
    .query(
      `SELECT user_id, full_name, email_address, roles, login_attempts, account_locked, locked_until FROM tblusers WHERE roles = 'user'`
    );

  return { success: true, user: data };
});

// ipcMain.handle('delete-user', async (event, id) => {
//   await db.promise().query('DELETE FROM users WHERE user_id = ?', [id]);
//   return { success: true };
// });
ipcMain.handle("register-user", async (event, {fullName, email, password }) => {
  try {
    const [existingUsers] = await databaseConnection
      .promise()
      .query('SELECT * FROM tblusers WHERE email_address = ?', [email]);
    if (existingUsers.length > 0) {
      return { success: false, message: "Email Address already registered" };
    }

    //Passord Hashing using bcrypt
    /* set saltRounds to 12 for more secured hashing */
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [insertResult] = await databaseConnection
      .promise()
      .query('INSERT INTO tblusers(full_name, email_address, hashed_password) VALUES(?,?, ?)', [
        fullName,
        email,
        hashedPassword,
      ]);
    return {
      success: true,
      message: "New User has been added",
      userId: insertResult.insertId,
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Registration failed' };
  }
});