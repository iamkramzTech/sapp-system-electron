import { ipcMain } from 'electron';
import {databaseConnection} from '../db';
import bcrypt from 'bcrypt';

ipcMain.handle('login-user', async (event, { email, password }) => {
  return new Promise((resolve, reject) => {
    databaseConnection.query('SELECT * FROM users WHERE email_address = ?', [email], async (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve({ success: false });

      const match = await bcrypt.compare(password, results[0].password);
      resolve({ success: match });
    });
  });
});


ipcMain.handle('register-user', async (event, { username, email, phone, password, fullName }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if the email already exists
      databaseConnection.query('SELECT * FROM users WHERE email_address = ?', [email], async (err, results) => {
        if (err) return reject(err);
        if (results.length > 0) return resolve({ success: false, message: 'Email already registered' });

        // Hash the password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the new user
        databaseConnection.query(
          `INSERT INTO users (user_name, email_address, phone_number, password_hash, full_name)
           VALUES (?, ?, ?, ?, ?)`,
          [username, email, phone, hashedPassword, fullName],
          (err, result) => {
            if (err) return reject(err);
            resolve({ success: true, userId: result.insertId });
          }
        );
      });
    } catch (error) {
      reject(error);
    }
  });
});
