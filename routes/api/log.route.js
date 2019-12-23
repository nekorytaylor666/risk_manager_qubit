var express = require('express')
var router = express.Router()
var LogController = require('../../controllers/log.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
router.post('/', Authorization, LogController.createLog)

// Export the Router
module.exports = router;