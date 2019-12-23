var Manager = require('../models/manager.model');
var Project = require('../models/project.model');
var Log = require('../models/log.model');

exports.createManager = async function (user, userId) {
    // Creating a new Mongoose Object by using the new keyword
    var newManager = new Manager({
        fio: user.fio,
        phone: user.phone,
        projects: user.projects
    })

    try {
        // Saving the Manager 
        var savedManager = await newManager.save();
        if(savedManager){
            var log = new Log({
                user: userId,
                object: savedManager._id,
                newValue: JSON.stringify(savedManager),
                action: 'New Manager object is created'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                } else if(doc){
                    return savedManager;
                }
            });
        }
        return savedManager;
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Ошибка при создании менеджера")
    }
}

exports.updateManagerList = async function (managers, userId) {
    // Creating a new Mongoose Object by using the new keyword
    try {
        console.log('man.len='+managers.length)
        for(let i=0; i<managers.length; i++){
            if(managers[i].projects){
                console.log('project.length='+managers[i].projects.length+' i='+i)
                var _updateManager = await Manager.findOne({ _id: managers[i]._id });
                var projectsID = []
                var existing = _updateManager.projects
                if(existing == null)
                    existing = []
    
                for(let j=0; j<managers[i].projects.length; j++){
                    var _updateProject = await Project.findOne({_id: managers[i].projects[j]})
                    var old = _updateProject
                    _updateProject.manager = _updateManager._id
                    var result = await _updateProject.save()
                    if(result){
                        var log = new Log({
                            user: userId,
                            object: result._id,
                            oldValue: JSON.stringify(old),
                            newValue: JSON.stringify(result),
                            action: 'Manager field of Project object is updated'
                        })
                        log.save(function(err,doc){
                            if(err){
                                throw Error(err)
                            }
                        });
                    }
                    projectsID.push(result._id)
                    let index = existing.indexOf(result._id)
                    if(index!=-1)
                        existing.splice(index,1)
                }
                for(let k=0; k<existing.length; k++){
                    var _updateProject = await Project.findOne({_id: existing[k]})
                    var old = _updateProject
                    _updateProject.manager = null
                    var result = await _updateProject.save()
                    if(result){
                        var log = new Log({
                            user: userId,
                            object: result._id,
                            oldValue: JSON.stringify(old),
                            newValue: JSON.stringify(result),
                            action: 'Manager field of Project object is updated to null'
                        })
                        log.save(function(err,doc){
                            if(err){
                                throw Error(err)
                            }
                        });
                    }
                }
                var old = _updateManager
                _updateManager.projects = projectsID
                var final = await _updateManager.save()
                if(final){
                    var log = new Log({
                        user: userId,
                        object: final._id,
                        oldValue: JSON.stringify(old),
                        newValue: JSON.stringify(final),
                        action: 'Projects field of Manager object is updated'
                    })
                    log.save(function(err,doc){
                        if(err){
                            throw Error(err)
                        }
                    });
                }
                if(i==(managers.length-1))
                    return managers.length
            }
        }
    } catch (e) {
        // return a Error message describing the reason     
        throw Error(e)
    }
}

exports.deleteManager = async function (id, userId) {
    // Delete the Manager
    try {
        var obj = Manager.find({_id: id})
        var deleted = await Manager.remove({_id: id})
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Manager Could not be deleted")
        } else {
            var log = new Log({
                user: userId,
                object: id,
                oldValue: JSON.stringify(obj),
                action: 'Manager object is deleted'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                } else if(doc){
                    return deleted;
                }
            });
        }
        return deleted;
    } catch (e) {
        throw Error(e)
    }
}

// Async function to get the User List
exports.getManagers = async function (userId) { 
    // Options setup for the mongoose paginate
/*    var options = {
        page,
        limit
    }*/
    // Try Catch the awaited promise to handle the error 
    try {
        var Managers = await Manager.find()
        if(Managers){
            var listIds = []
            for(let i=0;i<Managers.length;i++){
                listIds.push(Managers[i]._id)
                if(i==Managers.length-1){
                    var log = new Log({
                        user: userId,
                        object: listIds.toString(),
                        oldValue: JSON.stringify(Managers),
                        action: 'Manager object list is requested'
                    })
                    log.save(function(err,doc){
                        if(err){
                            throw Error(err)
                        } else if(doc){
                            return Managers;
                        }
                    });
                }
            }
        }
        // Return the Managerd list that was retured by the mongoose promise
        return Managers;
       } catch (e) {
        // return a Error message describing the reason 
        throw Error(e);
    }
}

exports.getManager = async function(id, userId){
    try {
        var found = await Manager.findOne({_id: id})
        if(found){
            var log = new Log({
                user: userId,
                object: found._id,
                oldValue: JSON.stringify(found),
                action: 'Manager object is requested'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                } else if(doc){
                    return found;
                }
            });
        }
        // Return the Manager list that was retured by the mongoose promise
        return found;
       } catch (e) {
        // return a Error message describing the reason 
        throw Error(e);
    }
}

exports.deleteManagerList = async function(list, userId) {
    try {
        var objs = Manager.find({_id: list})
        await Manager.deleteMany({_id: list}, function(error){
            if(error)
                throw Error(error.error);
            else {
                var log = new Log({
                    user: userId,
                    object: list,
                    oldValue: JSON.stringify(objs),
                    action: 'Manager objects are deleted'
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