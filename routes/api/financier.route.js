var express = require('express')
var router = express.Router()
var FinancierController = require('../../controllers/financier.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
router.get('/', Authorization, FinancierController.getFinanciers)
router.get('/financier/:id', Authorization, FinancierController.getFinancier)
router.delete('/:id', Authorization, FinancierController.removeFinancier)
//router.put('/:id', Authorization, FinancierController.updateFinancier)
router.post('/', Authorization, FinancierController.createFinancier)
router.post('/delete', Authorization, FinancierController.deleteFinancierList)
router.post('/update', Authorization, FinancierController.updateFinancierList)

// Export the Router
module.exports = router;