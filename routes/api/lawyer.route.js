var express = require('express')
var router = express.Router()
var LawyerController = require('../../controllers/lawyer.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
router.get('/', Authorization, LawyerController.getLawyers)
router.get('/lawyer/:id', Authorization, LawyerController.getLawyer)
router.delete('/:id', Authorization, LawyerController.removeLawyer)
//router.put('/:id', Authorization, LawyerController.updateLawyer)
router.post('/', Authorization, LawyerController.createLawyer)
router.post('/delete', Authorization, LawyerController.deleteLawyerList)
router.post('/update', Authorization, LawyerController.updateLawyerList)

// Export the Router
module.exports = router;