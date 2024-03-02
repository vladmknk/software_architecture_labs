const axios = require('axios');
const config = require('./config');
require('dotenv').config();

async function getData(req, res) {
    try {
        const response = await axios.get(`${config.get('api.url')}/`);
        res.status(200).send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Помилка виконання запиту');
    }
}

module.exports = {
    getData,
};
