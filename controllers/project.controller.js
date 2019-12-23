var ProjectService = require('../services/project.service');

exports.createProject = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var Project = req.body.project
    var id = req._id
    try {
        // Calling the Service function with the new object from the Request Body
        var createdProject = await ProjectService.createProject(id,Project)
        return res.status(201).json({data: createdProject, message: "Заявка успешно создана"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateProject = async function (req, res, next) {
    var id = req.params.id;
    var project = req.body.project;
    var userId = req._id
    var filter = {}
    if(req.body.codeFinancier){
        filter.codeFinancier = req.body.codeFinancier
    }
    if(req.body.codeLawyer){
        filter.codeLawyer = req.body.codeLawyer
    }
    if(req.body.docName){
        filter.docName = req.body.docName
    }
    if(req.body.anketaManagerNotify){
        filter.anketaManagerNotify = req.body.anketaManagerNotify
    }
    if(req.body.anketaSendInvestorNotify){
        filter.anketaSendInvestorNotify = req.body.anketaSendInvestorNotify
    }
    if(req.body.anketaSendInvestorNotify2){
        filter.anketaSendInvestorNotify2 = req.body.anketaSendInvestorNotify2
    }
    if(req.body.anketaAcceptNotify){
        filter.anketaAcceptNotify = req.body.anketaAcceptNotify
    }
    if(req.body.anketaAcceptNotify2){
        filter.anketaAcceptNotify2 = req.body.anketaAcceptNotify2
    }
    if(req.body.gant){
        filter.gant = req.body.gant
    }
    if(req.body.secondEtapManager){
        filter.secondEtapManager = req.body.secondEtapManager
    }
    if(req.body.secondEtapInvestor){
        filter.secondEtapInvestor = req.body.secondEtapInvestor
    }

    try {
        var updated = await ProjectService.updateProject(id, project, filter, userId);
        res.status(200).json(updated);
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.getProjects = async function (req, res, next) {
// Check the existence of the query parameters, If doesn't exists assign a default value
   /* var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;*/
    var role = req.query.role ? req.query.role : null
    var idUser = req._id
    try {
        var Projects = await ProjectService.getProjects(role, idUser)
        // Return the Projects list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Projects, message: "Succesfully Projects Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getProjectsByCriteria = async function (req, res, next) {
    var role = req.query.role ? req.query.role : null
    var projectCriteria = req.body.project
    var idUser = req._id
    try {
        var Projects = await ProjectService.getProjectsByCriteria(projectCriteria, role, idUser)
        res.status(200).json(Projects)
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getOrganisations = async function(req, res, next) {
    try {
        var organisations = await ProjectService.getOrganisations()
        return res.status(200).json({status: 200, data: organisations, message: "Succesfully organisations Recieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getProject = async function (req, res, next) {
// Check the existence of the query parameters, If doesn't exists assign a default value
    /* var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;*/
    var id = req.params.id
    var userId = req._id
    try {
        var Project = await ProjectService.getProject(id, userId)
        // Return the Projects list with the appropriate HTTP password Code and Message.
        return res.status(200).json(Project);
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
