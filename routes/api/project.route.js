var express = require('express')
var router = express.Router()
var ProjectController = require('../../controllers/project.controller');
var Authorization = require('../../auth/authorization');

// Authorize each API with middleware and map to the Controller Functions
router.get('/', Authorization, ProjectController.getProjects)
router.get('/project/:id', Authorization, ProjectController.getProject)
router.get('/organisations', Authorization, ProjectController.getOrganisations)
router.put('/:id', Authorization, ProjectController.updateProject)
router.post('/', Authorization, ProjectController.createProject)
router.post('/criteria', Authorization, ProjectController.getProjectsByCriteria)

// Export the Router
module.exports = router;