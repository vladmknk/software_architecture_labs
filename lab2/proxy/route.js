const express = require('express');
const service = require('./service');

const router = express.Router();

router.get('/', service.getData);

module.exports = router;
