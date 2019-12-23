var CategoryService = require('../services/category.service');

exports.createCategory = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var Category = req.body.category
    var userId = req._id
    try {
        // Calling the Service function with the new object from the Request Body
        var createdCategory = await CategoryService.createCategory(Category, userId)
        console.log('createdCategory = ' + createdCategory)
        return res.status(201).json({data: createdCategory, message: "Категория успешно создана"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.removeCategory = async function (req, res, next) {
    var id = req.params.id;
    var userId = req._id
    try {
        var deleted = await CategoryService.deleteCategory(id, userId);
        res.status(200).send("Succesfully Category Deleted");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateCategory = async function (req, res, next) {
    var category = req.body.category;
    var userId = req._id
    try {
        var updated = await CategoryService.updateCategory(category, userId);
        res.status(200).json({status: 200, data: updated, message: "Succesfully Category Updated"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.getCategories = async function (req, res, next) {
// Check the existence of the query parameters, If doesn't exists assign a default value
    /*var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;*/
    var userId = req._id
    try {
        var Categorys = await CategoryService.getCategories(userId)
        // Return the Categorys list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Categorys, message: "Succesfully Categorys Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getCategory = async function(req, res, next) {
    var id = req.params.id
    var userId = req._id
    try {
        var Category = await CategoryService.getCategory(id, userId)
        return res.status(200).json(Category);
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.deleteCategoryList = async function(req, res, next) {
    var list = req.body.categories;
    var userId = req._id
    try {
        await CategoryService.deleteCategoryList(list, userId)
        return res.status(200).json({status: 200, message: "Succesfully Categories Deleted"});
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}