require('dotenv').config();

function get(param) {
    const value = process.env[param];
    if (!value) {
        throw new Error(`Environment variable ${param} is not set`);
    }
    return value;
}

module.exports = {
    get
}