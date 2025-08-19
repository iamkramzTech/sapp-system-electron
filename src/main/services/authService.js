
const { databaseConnection } = require('../db');
const bcrypt = require('bcrypt');
let currentUser = null; //{id, email, role}
 async function authenticateUser(email, password, roleFilter = null) {
  const query = roleFilter
    ? 'SELECT * FROM tblusers WHERE email_address = ? AND roles = ?'
    : 'SELECT * FROM tblusers WHERE email_address = ?';

  const params = roleFilter ? [email, roleFilter] : [email];
  const [results] = await databaseConnection.promise().query(query, params);

  if (results.length === 0) return { success: false, message: "Invalid Credentials" };

  const user = results[0];
  const now = new Date();

  if (user.account_locked || (user.locked_until && new Date(user.locked_until) > now)) {
    return { success: false, message: "Account is temporarily locked. Try again later." };
  }

  const maxAttempts = user.roles === "admin" ? 10 : 3;
  const lockTime = user.roles === "admin" ? 1 : 5;
  const attempts = user.login_attempts + 1;
  const lockAccount = attempts >= maxAttempts;

  const match = await bcrypt.compare(password, user.hashed_password);
  if (!match) {
    await databaseConnection.promise().query(
      'UPDATE tblusers SET login_attempts = ?, account_locked = ?, locked_until = ? WHERE user_id = ?',
      [attempts, lockAccount, lockAccount ? new Date(Date.now() + lockTime * 60000) : null, user.user_id]
    );
    return {
      success: false,
      message: lockAccount
        ? `Too many failed attempts. Account locked for ${lockTime} minutes`
        : "Invalid Credentials"
    };
  }

  await databaseConnection.promise().query(
    'UPDATE tblusers SET login_attempts = 0, account_locked = false, locked_until = null WHERE user_id = ?',
    [user.user_id]
  );
currentUser = { id: user.user_id, name: user.full_name, role: user.roles };
  return { success: true, message: "Login successful", user: currentUser };
}

 async function getSession()
{
  return currentUser;
}
async function getUserSessionByID()
{
  return currentUser.id
}
 async function logout() {
  currentUser = null;
  return { success: true, message: "Logout Bye.." };
}

module.exports = {
  authenticateUser,
  getSession,
  getUserSessionByID,
  logout
};