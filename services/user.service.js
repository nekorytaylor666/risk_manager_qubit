var User = require('../models/user.model');
var Manager = require('../models/manager.model');
var Lawyer = require('../models/lawyer.model');
var Financier = require('../models/financier.model');
var config = require('../config');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var _ = require('lodash')
var Log = require('../models/log.model');

exports.createUser = async function (user) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    var newUser = new User({
        login: user.login,
        password: hashedPassword,
        email: user.email,
        phone: user.phone,
        bin: user.bin,
        organisation: user.organisation,
        address: user.address,
        fioDirector: user.fioDirector,
        registration: user.registration,
        role: user.role
    })

    console.log('role == '+ newUser.role)
    if(newUser.role == 'financier'){
        var financier = await Financier.findOne({phone: newUser.phone})
        if(financier){
            try {
                // Saving the User 
                newUser.financier = financier._id
                var savedUser = await newUser.save();
                if(savedUser){
                    var log = new Log({
                        user: null,
                        object: savedUser._id,
                        newValue: JSON.stringify(savedUser),
                        action: 'User object is created and logged in'
                    })
                    log.save(function(err,doc){
                        if(err){
                            throw Error(err)
                        }
                    });
                }
                var token = jwt.sign({id: savedUser._id}, config.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
                var data = {
                    idToken: token,
                    expiresIn: 86400,
                    role: savedUser.role
                }
                return data;
            } catch (e) {
                // return a Error message describing the reason     
                throw Error(e)
            }
        } else  {
            throw Error("Нет финансиста с таким номером телефона")
        }
    } else if(newUser.role == 'lawyer'){
        var lawyer = await Lawyer.findOne({phone: newUser.phone})
        console.log('lawyer id = '+lawyer._id)
        if(lawyer){
            try {
                // Saving the User 
                newUser.lawyer = lawyer._id
                var savedUser = await newUser.save();
                if(savedUser){
                    var log = new Log({
                        user: null,
                        object: savedUser._id,
                        newValue: JSON.stringify(savedUser),
                        action: 'User object is created and logged in'
                    })
                    log.save(function(err,doc){
                        if(err){
                            throw Error(err)
                        }
                    });
                }
                var token = jwt.sign({id: savedUser._id}, config.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
                var data = {
                    idToken: token,
                    expiresIn: 86400,
                    role: savedUser.role
                }
                return data;
            } catch (e) {
                // return a Error message describing the reason     
                throw Error(e)
            }
        } else  {
            throw Error("Нет юриста с таким номером телефона")
        }
    } else if(newUser.role == 'manager'){
        var manager = await Manager.findOne({phone: newUser.phone})
        if(manager){
            try {
                // Saving the User 
                newUser.manager = manager._id
                var savedUser = await newUser.save();
                if(savedUser){
                    var log = new Log({
                        user: null,
                        object: savedUser._id,
                        newValue: JSON.stringify(savedUser),
                        action: 'User object is created and logged in'
                    })
                    log.save(function(err,doc){
                        if(err){
                            throw Error(err)
                        }
                    });
                }
                var token = jwt.sign({id: savedUser._id}, config.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
                var data = {
                    idToken: token,
                    expiresIn: 86400,
                    role: savedUser.role
                }
                return data;
            } catch (e) {
                // return a Error message describing the reason     
                throw Error(e)
            }
        } else  {
            throw Error("Нет менеджера с таким номером телефона")
        }
    } else {
        try {
            // Saving the User 
            var savedUser = await newUser.save();
            if(savedUser){
                var log = new Log({
                    user: null,
                    object: savedUser._id,
                    newValue: JSON.stringify(savedUser),
                    action: 'User object is created and logged in'
                })
                log.save(function(err,doc){
                    if(err){
                        throw Error(err)
                    }
                });
            }
            var token = jwt.sign({id: savedUser._id}, config.SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });
            var data = {
                idToken: token,
                expiresIn: 86400,
                role: savedUser.role
            }
            return data;
        } catch (e) {
            // return a Error message describing the reason     
            throw Error(e)
        }
    }
}

exports.loginUser = async function (user) {
    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 
        var _details = await User.findOne({ login: user.login });
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) throw Error("Неверный логин/пароль")
        if(_details){
            var log = new Log({
                user: null,
                object: _details._id,
                newValue: JSON.stringify(_details),
                action: 'User logged in'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                }
            });
        }
        var token = jwt.sign({id: _details._id}, config.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        var data = {
            idToken: token,
            expiresIn: 86400,
            role: _details.role
        }
        return data;
    } catch (e) {
        // return a Error message describing the reason     
        throw Error(e)
    }
}

exports.forgot = async function (user) {
    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 
        var _details = await User.findOne({ email: user.email, login: user.login });
        var old = _details
        var hashedPassword = bcrypt.hashSync(user.password, 8);
        _details.password = hashedPassword;
        var final = await _details.save();
        if(final){
            var log = new Log({
                user: null,
                object: _details._id,
                oldValue: JSON.stringify(old),
                newValue: JSON.stringify(final),
                action: 'User forgot and changed password'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                } else if(doc){
                    return final
                }
            });
        }
        return final;
    } catch (e) {
        // return a Error message describing the reason     
        throw Error(e)
    }
}

exports.updateUser = async function (id, user, userId) {
    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 
        var _updateUser = await User.findOne({ _id: id });
        var old = _updateUser
        _updateUser =  _.extend(_updateUser , user);
        var final = await _updateUser.save();
        if(final){
            var log = new Log({
                user: userId,
                object: final._id,
                oldValue: JSON.stringify(old),
                newValue: JSON.stringify(final),
                action: 'User object is updated'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                } else if(doc){
                    return final
                }
            });
        }
        return final;
    } catch (e) {
        // return a Error message describing the reason     
        throw Error(e)
    }
}

exports.deleteUser = async function (id) {
    // Delete the User
    try {
        var deleted = await User.remove({_id: id})
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}

// Async function to get the User List
exports.getUsers = async function (query, page, limit) { 
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var Users = await User.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Users;
       } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Users');
    }
}