const express = require('express');
const app = express();
const dotenv = require('dotenv');

const env_text = dotenv.config().parsed.RESPONSE_TEXT;

app.get('/', (req, res) => {
    res.send(`${env_text}`);
});

module.exports = app;
