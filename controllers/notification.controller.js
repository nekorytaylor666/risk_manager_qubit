var NotificationService = require('../services/notification.service');

exports.createNotification = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var Notification = req.body.notification
    var userId = req._id
    try {
        // Calling the Service function with the new object from the Request Body
        var createdNotification = await NotificationService.createNotification(Notification, userId)
        return res.status(201).json({data: createdNotification, message: "Уведомление успешно создан"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.removeNotification = async function (req, res, next) {
    var id = req.params.id;
    var userId = req._id
    try {
        var deleted = await NotificationService.deleteNotification(id, userId);
        res.status(200).send("Succesfully Notification Deleted");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateNotification = async function (req, res, next) {
    var Notification = req.body.Notification;
    var userId = req._id
    try {
        var updated = await NotificationService.updateNotification(Notification, userId);
        res.status(200).json({status: 200, data: updated, message: "Succesfully Notification Updated"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.getNotifications = async function (req, res, next) {
// Check the existence of the query parameters, If doesn't exists assign a default value
    /*var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;*/
    var role = req.query.role
    var userId = req._id
    try {
        var Notifications = await NotificationService.getNotifications(role, userId)
        // Return the Notifications list with the appropriate HTTP password Code and Message.
        return res.status(200).json(Notifications);
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getNotification = async function(req, res, next) {
    var id = req.params.id
    var userId = req._id
    try {
        var Notification = await NotificationService.getNotification(id, userId)
        return res.status(200).json(Notification);
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.deleteNotificationList = async function(req, res, next) {
    var list = req.body.notifications;
    var userId = req._id
    try {
        await NotificationService.deleteNotificationList(list, userId)
        return res.status(200).json({status: 200, message: "Succesfully Notifications Deleted"});
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}