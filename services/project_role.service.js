var Project_Role = require('../models/project_role.model');
var Log = require('../models/log.model');

exports.createProject_Role = async function (user, userId) {
    // Creating a new Mongoose Object by using the new keyword
    var newProject_Role = new Project_Role({
        name: user.name,
    })

    try {
        // Saving the Project_Role 
        var savedProject_Role = await newProject_Role.save();
        if(savedProject_Role){
            var log = new Log({
                user: userId,
                object: savedProject_Role._id,
                newValue: JSON.stringify(savedProject_Role),
                action: 'Project_Role object is created'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                } else if(doc){
                    return savedProject_Role
                }
            });
        }
        return savedProject_Role;
    } catch (e) {
        // return a Error message describing the reason     
        throw Error(e)
    }
}

exports.updateProject_Role = async function (Role, userId) {
    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the Project_Role 
        var _updateProject_Role = await Project_Role.findOne({ _id: Role._id });
        var old  = _updateProject_Role
        _updateProject_Role.name = Role.name;
        var final = await _updateProject_Role.save();
        if(final){
            var log = new Log({
                user: userId,
                object: final._id,
                oldValue: JSON.stringify(old),
                newValue: JSON.stringify(final),
                action: 'Project_Role object is updated'
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

exports.deleteProject_Role = async function (id, userId) {
    // Delete the Project_Role
    try {
        var obj = Project_Role.find({_id:id})
        var deleted = await Project_Role.remove({_id: id})
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Project_Role Could not be deleted")
        } else {
            var log = new Log({
                user: userId,
                object: id,
                oldValue: JSON.stringify(obj),
                action: 'Project_Role object is deleted'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                } else if(doc){
                    return deleted
                }
            });
        }
        return deleted;
    } catch (e) {
        throw Error(e)
    }
}

// Async function to get the User List
exports.getCategories = async function (userId) { 
    // Options setup for the mongoose paginate
/*    var options = {
        page,
        limit
    }*/
    // Try Catch the awaited promise to handle the error 
    try {
        var Categories = await Project_Role.find()
        if(Categories){
            var listIds = []
            for(let i=0; i<Categories.length; i++){
                listIds.push(Categories[i]._id)
                if(i==Categories.length-1){
                    var log = new Log({
                        user: userId,
                        object: listIds.toString(),
                        oldValue: JSON.stringify(Categories),
                        action: 'Project_Role object list is requested'
                    })
                    log.save(function(err,doc){
                        if(err){
                            throw Error(err)
                        } else if(doc){
                            return Categories
                        }
                    });
                }
            }
        }
        // Return the Project_Roled list that was retured by the mongoose promise
        return Categories;
    } catch (e) {
        // return a Error message describing the reason 
        throw Error(e);
    }
}

// Async function to get the User List
exports.getProject_Role = async function (id, userId) { 
    // Options setup for the mongoose paginate
/*    var options = {
        page,
        limit
    }*/
    // Try Catch the awaited promise to handle the error 
    try {
        var Categories = await Project_Role.findById(id)
        if(Categories){
            var log = new Log({
                user: userId,
                object: id,
                oldValue: JSON.stringify(Categories),
                action: 'Project_Role object is requested'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                } else if(doc){
                    return Categories
                }
            });
        }
        // Return the Project_Roled list that was retured by the mongoose promise
        return Categories;
    } catch (e) {
        // return a Error message describing the reason 
        throw Error(e);
    }
}

exports.deleteProject_RoleList = async function(list, userId) {
    try {
        var objs = Project_Role.find({_id: list})
        await Project_Role.deleteMany({_id: list}, function(error){
            if(error)
                throw Error(error.error);
            else {
                var log = new Log({
                    user: userId,
                    object: list,
                    oldValue: JSON.stringify(objs),
                    action: 'Project_Role object list is deleted'
                })
                log.save(function(err,doc){
                    if(err){
                        throw Error(err)
                    }
                });
            }
        })
    } catch (e) {
        throw Error(e);
    }
}