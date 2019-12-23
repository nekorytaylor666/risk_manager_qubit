var express = require('express')
var router = express.Router()
var NotificationController = require('../../controllers/notification.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
router.get('/', Authorization, NotificationController.getNotifications)
router.get('/notification/:id', Authorization, NotificationController.getNotification)
router.delete('/:id', Authorization, NotificationController.removeNotification)
router.put('/', Authorization, NotificationController.updateNotification)
router.post('/', Authorization, NotificationController.createNotification)
router.post('/delete', Authorization, NotificationController.deleteNotificationList)

// Export the Router
module.exports = router;