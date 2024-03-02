const convict = require('convict');
require('dotenv').config();

const config = convict({
    api: {
        url: {
            doc: 'API URL',
            format: String,
            default: process.env.API_URL,
        },
    },
    server: {
        port: {
            doc: 'API PORT',
            format: 'port',
            default: process.env.PORT,
        },
    },
});

module.exports = config;
