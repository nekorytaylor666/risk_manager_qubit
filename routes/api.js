var express = require('express')

var router = express.Router()

var users = require('./api/user.route')
var managers = require('./api/manager.route')
var lawyers = require('./api/lawyer.route')
var financiers = require('./api/financier.route')
var projects = require('./api/project.route')
var category = require('./api/category.route')
var project_role = require('./api/project_role.route')
var notification = require('./api/notification.route')
var log = require('./api/log.route')

router.use('/users', users);
router.use('/managers', managers);
router.use('/lawyers', lawyers);
router.use('/financiers', financiers);
router.use('/projects', projects);
router.use('/categories', category);
router.use('/project_roles', project_role);
router.use('/notifications', notification);
router.use('/logs', log);

module.exports = router;