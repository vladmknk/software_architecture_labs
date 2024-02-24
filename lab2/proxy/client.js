const axios = require('axios');

async function makeRequest() {
    try {
        const response = await axios.get('http://localhost:3001');
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

makeRequest();
