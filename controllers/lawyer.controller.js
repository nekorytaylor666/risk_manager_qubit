var LawyerService = require('../services/lawyer.service');

exports.createLawyer = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var Lawyer = req.body.lawyer
    var userId = req._id
    try {
        // Calling the Service function with the new object from the Request Body
        var createdLawyer = await LawyerService.createLawyer(Lawyer, userId)
        console.log('createdLawyer = ' + createdLawyer)
        return res.status(201).json({data: createdLawyer, message: "Пользователь успешно создан"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.removeLawyer = async function (req, res, next) {
    var id = req.params.id;
    var userId = req._id
    try {
        var deleted = await LawyerService.deleteLawyer(id, userId);
        res.status(200).send("Succesfully Lawyer Deleted");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateLawyerList = async function (req, res, next) {
    var Lawyers = req.body.lawyers;
    var userId = req._id
    try {
        var updated = await LawyerService.updateLawyerList(Lawyers, userId);
        res.status(200).json({status: 200, data: updated, message: "Succesfully Lawyer List Updated"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.getLawyers = async function (req, res, next) {
// Check the existence of the query parameters, If doesn't exists assign a default value
    /*var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;*/
    var userId = req._id
    try {
        var Lawyers = await LawyerService.getLawyers(userId)
        // Return the Lawyers list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Lawyers, message: "Succesfully Lawyers Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getLawyer = async function (req, res, next) {
    var id = req.params.id
    var userId = req._id
    try {
        var Lawyer = await LawyerService.getLawyer(id, userId)
        // Return the Lawyers list with the appropriate HTTP password Code and Message.
        return res.status(200).json(Lawyer);
    } catch(e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.deleteLawyerList = async function(req, res, next) {
    var list = req.body.lawyers;
    var userId = req._id
    try {
        await LawyerService.deleteLawyerList(list, userId)
        return res.status(200).json({status: 200, message: "Succesfully Lawyers Deleted"});
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}