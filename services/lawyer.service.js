var Lawyer = require('../models/lawyer.model');
var Project = require('../models/project.model');
var Log = require('../models/log.model');

exports.createLawyer = async function (user, userId) {
    // Creating a new Mongoose Object by using the new keyword
    var newLawyer = new Lawyer({
        fio: user.fio,
        phone: user.phone,
        projects: user.projects
    })

    try {
        // Saving the Lawyer 
        var savedLawyer = await newLawyer.save();
        if(savedLawyer){
            var log = new Log({
                user: userId,
                object: savedLawyer._id,
                newValue: JSON.stringify(savedLawyer),
                action: 'New Lawyer object is created'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                } else if(doc){
                    return savedLawyer;
                }
            });
        }
        return savedLawyer;
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Ошибка при создании менеджера")
    }
}

exports.updateLawyerList = async function (Lawyers, userId) {
    // Creating a new Mongoose Object by using the new keyword
    try {
        console.log('man.len='+Lawyers.length)
        for(let i=0; i<Lawyers.length; i++){
            if(Lawyers[i].projects){
                console.log('project.length='+Lawyers[i].projects.length+' i='+i)
                var _updateLawyer = await Lawyer.findOne({ _id: Lawyers[i]._id });
                var projectsID = []
                var existing = _updateLawyer.projects
                if(existing == null)
                    existing = []
    
                for(let j=0; j<Lawyers[i].projects.length; j++){
                    var _updateProject = await Project.findOne({_id: Lawyers[i].projects[j]})
                    var old = _updateProject
                    _updateProject.lawyer = _updateLawyer._id
                    var result = await _updateProject.save()
                    if(result){
                        var log = new Log({
                            user: userId,
                            object: result._id,
                            oldValue: JSON.stringify(old),
                            newValue: JSON.stringify(result),
                            action: 'Lawyer field of Project object is updated'
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
                    _updateProject.lawyer = null
                    var result = await _updateProject.save()
                    if(result){
                        var log = new Log({
                            user: userId,
                            object: result._id,
                            oldValue: JSON.stringify(old),
                            newValue: JSON.stringify(result),
                            action: 'Lawyer field of Project object is updated to null'
                        })
                        log.save(function(err,doc){
                            if(err){
                                throw Error(err)
                            }
                        });
                    }
                }
                var old = _updateLawyer
                _updateLawyer.projects = projectsID
                var final = await _updateLawyer.save()
                if(final){
                    var log = new Log({
                        user: userId,
                        object: final._id,
                        oldValue: JSON.stringify(old),
                        newValue: JSON.stringify(final),
                        action: 'Projects field of Lawyer object is updated'
                    })
                    log.save(function(err,doc){
                        if(err){
                            throw Error(err)
                        }
                    });
                }
                if(i==(Lawyers.length-1))
                    return Lawyers.length
            }
        }
    } catch (e) {
        // return a Error message describing the reason     
        throw Error(e)
    }
}

exports.deleteLawyer = async function (id, userId) {
    // Delete the Lawyer
    try {
        var obj = Lawyer.find({_id: id})
        var deleted = await Lawyer.remove({_id: id})
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Lawyer Could not be deleted")
        } else {
            var log = new Log({
                user: userId,
                object: id,
                oldValue: JSON.stringify(obj),
                action: 'Lawyer object is deleted'
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
exports.getLawyers = async function (userId) { 
    // Options setup for the mongoose paginate
/*    var options = {
        page,
        limit
    }*/
    // Try Catch the awaited promise to handle the error 
    try {
        var Lawyers = await Lawyer.find()
        if(Lawyers){
            var listIds = []
            for(let i=0;i<Lawyers.length;i++){
                listIds.push(Lawyers[i]._id)
                if(i==Lawyers.length-1){
                    var log = new Log({
                        user: userId,
                        object: listIds.toString(),
                        oldValue: JSON.stringify(Lawyers),
                        action: 'Lawyer object list is requested'
                    })
                    log.save(function(err,doc){
                        if(err){
                            throw Error(err)
                        } else if(doc){
                            return Lawyers;
                        }
                    });
                }
            }
        }
        // Return the Lawyerd list that was retured by the mongoose promise
        return Lawyers;
       } catch (e) {
        // return a Error message describing the reason 
        throw Error(e);
    }
}

exports.getLawyer = async function(id, userId){
    try {
        var found = await Lawyer.findOne({_id: id})
        if(found){
            var log = new Log({
                user: userId,
                object: found._id,
                oldValue: JSON.stringify(found),
                action: 'Lawyer object is requested'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                } else if(doc){
                    return found;
                }
            });
        }
        // Return the Lawyer list that was retured by the mongoose promise
        return found;
       } catch (e) {
        // return a Error message describing the reason 
        throw Error(e);
    }
}

exports.deleteLawyerList = async function(list, userId) {
    try {
        var objs = Lawyer.find({_id: list})
        await Lawyer.deleteMany({_id: list}, function(error){
            if(error)
                throw Error(error.error);
            else {
                var log = new Log({
                    user: userId,
                    object: list,
                    oldValue: JSON.stringify(objs),
                    action: 'Lawyer objects are deleted'
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