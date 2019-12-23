var ManagerService = require('../services/manager.service');

exports.createManager = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var Manager = req.body.manager
    var userId = req._id
    try {
        // Calling the Service function with the new object from the Request Body
        var createdManager = await ManagerService.createManager(Manager, userId)
        console.log('createdManager = ' + createdManager)
        return res.status(201).json({data: createdManager, message: "Пользователь успешно создан"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.removeManager = async function (req, res, next) {
    var id = req.params.id;
    var userId = req._id
    try {
        var deleted = await ManagerService.deleteManager(id, userId);
        res.status(200).send("Succesfully Manager Deleted");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateManagerList = async function (req, res, next) {
    var managers = req.body.managers;
    var userId = req._id
    try {
        var updated = await ManagerService.updateManagerList(managers, userId);
        res.status(200).json({status: 200, data: updated, message: "Succesfully Manager List Updated"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.getManagers = async function (req, res, next) {
// Check the existence of the query parameters, If doesn't exists assign a default value
    /*var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;*/
    var userId = req._id
    try {
        var Managers = await ManagerService.getManagers(userId)
        // Return the Managers list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Managers, message: "Succesfully Managers Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getManager = async function (req, res, next) {
    var id = req.params.id
    var userId = req._id
    try {
        var Manager = await ManagerService.getManager(id, userId)
        // Return the Managers list with the appropriate HTTP password Code and Message.
        return res.status(200).json(Manager);
    } catch(e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.deleteManagerList = async function(req, res, next) {
    var list = req.body.managers;
    var userId = req._id
    try {
        await ManagerService.deleteManagerList(list, userId)
        return res.status(200).json({status: 200, message: "Succesfully Managers Deleted"});
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}