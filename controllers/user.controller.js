var UserService = require('../services/user.service');
var User = require('../models/user.model');
var request = require('request');
var multer = require('multer');
const path = require('path');
var mongoose = require('mongoose')
var Log = require('../models/log.model');

exports.createUser = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var User = req.body.user
    try {
        // Calling the Service function with the new object from the Request Body
        var createdUser = await UserService.createUser(User)
        return res.status(201).json({data: createdUser, message: "Пользователь успешно создан"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.removeUser = async function (req, res, next) {
    var id = req.params.id;
    try {
        var deleted = await UserService.deleteUser(id);
        res.status(200).send("Succesfully User Deleted");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateUser = async function (req, res, next) {
    var id = req.query.id;
    var user = req.body.user;
    var userId = req._id
    try {
        var updated = await UserService.updateUser(id, user, userId);
        res.status(200).json({status: 200, data: updated, message: "Succesfully User Updated"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.loginUser = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var User = {
        login: req.body.login,
        password: req.body.password
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var loginUser = await UserService.loginUser(User);
        return res.status(201).json({data: loginUser, message: "Успешный вход"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Неверный логин или пароль"})
    }
}

exports.forgot = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var User = {
        email: req.body.email,
        login: req.body.login
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var loginUser = await UserService.forgot(User);
        return res.status(201).json({data: loginUser, message: "Успешный вход"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Неверный email или логин"})
    }
}

exports.getByBIN = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var bin = req.body.bin
    request('http://stat.gov.kz/api/juridical/?bin='+bin+'&lang=ru', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        if(!(response && response.statusCode)){
            return res.status(400).json({status: 400, message: body, errorMessage: error});
        } else if(response.statusCode == 200){
            var obj = JSON.parse(body)
            return res.status(200).json({status: 200, data: obj, message: "Succesfully Users Recieved"});
        }
    });
}

exports.getUsers = async function (req, res, next) {
// Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Users = await UserService.getUsers({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getCurrentUser = async function (req, res, next) {
// Check the existence of the query parameters, If doesn't exists assign a default value
    var id = req._id
    try {
        // Return the Users list with the appropriate HTTP password Code and Message.
        var user = await User.findById(id)
        if(user){
            var log = new Log({
                user: id,
                object: id,
                oldValue: JSON.stringify(user),
                action: 'User object is requested'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                }
            });
        }
        return res.status(200).json(user);
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
    
exports.downloadFile = async function (req, res, next) {
    var filename = req.params.filename
    return res.download('../mean/public/files/'+filename)
}

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, path.resolve('./public/files').replace('\\','/'))
	},
	filename: function(req, file, cb){
		cb(null, mongoose.Types.ObjectId()+path.extname(file.originalname));
	}
});
exports.upload = multer({
    storage: storage
}).fields([
    { name: 'financialReport1', maxCount: 1 }, 
    { name: 'financialReport2', maxCount: 1 },
    { name: 'financialReport3', maxCount: 1 },
    { name: 'descriptionNote1', maxCount: 1 },
    { name: 'descriptionNote2', maxCount: 1 },
    { name: 'descriptionNote3', maxCount: 1 },
    { name: 'garantyLetter', maxCount: 1 },
    { name: 'landSchema', maxCount: 1 },
    { name: 'projectConcept', maxCount: 1 },
    { name: 'foreskiz', maxCount: 1 },
    { name: 'currentFile', maxCount: 1 }
])
