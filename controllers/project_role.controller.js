var Project_RoleService = require('../services/project_role.service');

exports.createProject_Role = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var Project_Role = req.body.Project_Role
    var userId = req._id
    try {
        // Calling the Service function with the new object from the Request Body
        var createdProject_Role = await Project_RoleService.createProject_Role(Project_Role, userId)
        return res.status(201).json({data: createdProject_Role, message: "Пользователь успешно создан"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.removeProject_Role = async function (req, res, next) {
    var id = req.params.id;
    var userId = req._id
    try {
        var deleted = await Project_RoleService.deleteProject_Role(id, userId);
        res.status(200).send("Succesfully Project_Role Deleted");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateProject_Role = async function (req, res, next) {
    var Project_Role = req.body.Project_Role;
    var userId = req._id
    try {
        var updated = await Project_RoleService.updateProject_Role(Project_Role, userId);
        res.status(200).json({status: 200, data: updated, message: "Succesfully Project_Role Updated"});
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
        var Project_Roles = await Project_RoleService.getCategories(userId)
        // Return the Project_Roles list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Project_Roles, message: "Succesfully Project_Roles Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getProject_Role = async function (req, res, next) {
    // Check the existence of the query parameters, If doesn't exists assign a default value
        /*var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 10;*/
        var id = req.params.id;
        var userId = req._id
        try {
            var Project_Roles = await Project_RoleService.getProject_Role(id, userId)
            // Return the Project_Roles list with the appropriate HTTP password Code and Message.
            return res.status(200).json({status: 200, data: Project_Roles, message: "Succesfully Project_Roles Recieved"});
        } catch (e) {
            //Return an Error Response Message with Code and the Error Message.
            return res.status(400).json({status: 400, message: e.message});
        }
    }
    
exports.deleteProject_RoleList = async function(req, res, next) {
    var list = req.body.categories;
    var userId = req._id
    try {
        await Project_RoleService.deleteProject_RoleList(list, userId)
        return res.status(200).json({status: 200, message: "Succesfully Categories Deleted"});
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}