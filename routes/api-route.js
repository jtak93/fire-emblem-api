var express = require('express');
var router = express.Router();

router.use('/test', require('./test-route'))

module.exports = router;
