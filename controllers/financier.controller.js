var FinancierService = require('../services/financier.service');

exports.createFinancier = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var Financier = req.body.financier
    var userId = req._id
    try {
        // Calling the Service function with the new object from the Request Body
        var createdFinancier = await FinancierService.createFinancier(Financier, userId)
        console.log('createdFinancier = ' + createdFinancier)
        return res.status(201).json({data: createdFinancier, message: "Пользователь успешно создан"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.removeFinancier = async function (req, res, next) {
    var id = req.params.id;
    var userId = req._id
    try {
        var deleted = await FinancierService.deleteFinancier(id, userId);
        res.status(200).send("Succesfully Financier Deleted");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateFinancierList = async function (req, res, next) {
    var Financiers = req.body.financiers;
    var userId = req._id
    try {
        var updated = await FinancierService.updateFinancierList(Financiers, userId);
        res.status(200).json({status: 200, data: updated, message: "Succesfully Financier List Updated"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.getFinanciers = async function (req, res, next) {
// Check the existence of the query parameters, If doesn't exists assign a default value
    /*var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;*/
    var userId = req._id
    try {
        var Financiers = await FinancierService.getFinanciers(userId)
        // Return the Financiers list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Financiers, message: "Succesfully Financiers Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getFinancier = async function (req, res, next) {
    var id = req.params.id
    var userId = req._id
    try {
        var Financier = await FinancierService.getFinancier(id, userId)
        // Return the Financiers list with the appropriate HTTP password Code and Message.
        return res.status(200).json(Financier);
    } catch(e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.deleteFinancierList = async function(req, res, next) {
    var list = req.body.financiers;
    var userId = req._id
    try {
        await FinancierService.deleteFinancierList(list, userId)
        return res.status(200).json({status: 200, message: "Succesfully Financiers Deleted"});
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}