import { ipcMain } from 'electron';
import { databaseConnection } from '../db.js';
ipcMain.handle('get-cities', async () => {
    return new Promise((resolve, reject) => {
        databaseConnection.query('SELECT Name, CountryCode, Population FROM city LIMIT 10', (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
});