var express = require('express')
var router = express.Router()
var Project_RoleController = require('../../controllers/project_role.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
router.get('/', Authorization, Project_RoleController.getCategories)
router.get('/project_role/:id', Authorization, Project_RoleController.getProject_Role)
router.delete('/:id', Authorization, Project_RoleController.removeProject_Role)
router.put('/', Authorization, Project_RoleController.updateProject_Role)
router.post('/', Authorization, Project_RoleController.createProject_Role)
router.post('/delete', Authorization, Project_RoleController.deleteProject_RoleList)

// Export the Router
module.exports = router;