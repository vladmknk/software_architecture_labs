const convict = require('convict');
require('dotenv').config();

const config = convict({
    env: {
        doc: 'Середовище застосування',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV',
    },
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
