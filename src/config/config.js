const dotenv = require('dotenv');
dotenv.config();
const { NODE_ENV, APP_VERSION, SECRET_KEY, SECRET_IV, ENCRYPTION_METHOD } = process.env;

module.exports = {
    env: NODE_ENV,
    version: APP_VERSION,
    secret_key: SECRET_KEY,
    secret_iv: SECRET_IV,
    encryption_method: ENCRYPTION_METHOD
};