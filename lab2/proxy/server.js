const express = require('express');
const config = require('./config');
const route = require('./route');
require('dotenv').config();

const app = express();

app.use('/', route);

app.listen(config.get('server.port'), () => {
    console.log(`Server listening on port ${config.get('server.port')}`);
});

module.exports = app;
