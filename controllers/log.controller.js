var LogService = require('../services/log.service');

exports.createLog = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var Log = req.body.log
    var userId = req._id
    try {
        // Calling the Service function with the new object from the Request Body
        var createdCategory = await LogService.createLog(Log, userId)
        return res.status(201).json({data: createdCategory, message: "Лог успешно создан"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message})
    }
}
