var express = require('express')
var router = express.Router()
var ManagerController = require('../../controllers/manager.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
router.get('/', Authorization, ManagerController.getManagers)
router.get('/manager/:id', Authorization, ManagerController.getManager)
router.delete('/:id', Authorization, ManagerController.removeManager)
//router.put('/:id', Authorization, ManagerController.updateManager)
router.post('/', Authorization, ManagerController.createManager)
router.post('/delete', Authorization, ManagerController.deleteManagerList)
router.post('/update', Authorization, ManagerController.updateManagerList)

// Export the Router
module.exports = router;