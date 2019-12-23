var Financier = require('../models/financier.model');
var Project = require('../models/project.model');
var Log = require('../models/log.model');

exports.createFinancier = async function (user, userId) {
    // Creating a new Mongoose Object by using the new keyword
    var newFinancier = new Financier({
        fio: user.fio,
        phone: user.phone,
        projects: user.projects
    })

    try {
        // Saving the Financier 
        var savedFinancier = await newFinancier.save();
        if(savedFinancier){
            var log = new Log({
                user: userId,
                object: savedFinancier._id,
                newValue: JSON.stringify(savedFinancier),
                action: 'New Financier object is created'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                } else if(doc){
                    return savedFinancier;
                }
            });
        }
        return savedFinancier;
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Ошибка при создании менеджера")
    }
}

exports.updateFinancierList = async function (Financiers, userId) {
    // Creating a new Mongoose Object by using the new keyword
    try {
        console.log('man.len='+Financiers.length)
        for(let i=0; i<Financiers.length; i++){
            if(Financiers[i].projects){
                console.log('project.length='+Financiers[i].projects.length+' i='+i)
                var _updateFinancier = await Financier.findOne({ _id: Financiers[i]._id });
                var projectsID = []
                var existing = _updateFinancier.projects
                if(existing == null)
                    existing = []
                console.log('_updateFinancier='+_updateFinancier)
                for(let j=0; j<Financiers[i].projects.length; j++){
                    var _updateProject = await Project.findOne({_id: Financiers[i].projects[j]})
                    var old = _updateProject
                    _updateProject.financier = _updateFinancier._id
                    var result = await _updateProject.save()
                    if(result){
                        var log = new Log({
                            user: userId,
                            object: result._id,
                            oldValue: JSON.stringify(old),
                            newValue: JSON.stringify(result),
                            action: 'Financier field of Project object is updated'
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
                    _updateProject.financier = null
                    var result = await _updateProject.save()
                    if(result){
                        var log = new Log({
                            user: userId,
                            object: result._id,
                            oldValue: JSON.stringify(old),
                            newValue: JSON.stringify(result),
                            action: 'Financier field of Project object is updated to null'
                        })
                        log.save(function(err,doc){
                            if(err){
                                throw Error(err)
                            }
                        });
                    }
                }
                var old = _updateFinancier
                _updateFinancier.projects = projectsID
                var final = await _updateFinancier.save()
                if(final){
                    var log = new Log({
                        user: userId,
                        object: final._id,
                        oldValue: JSON.stringify(old),
                        newValue: JSON.stringify(final),
                        action: 'Projects field of Financier object is updated'
                    })
                    log.save(function(err,doc){
                        if(err){
                            throw Error(err)
                        }
                    });
                }
                if(i==(Financiers.length-1))
                    return Financiers.length
            }
        }
    } catch (e) {
        // return a Error message describing the reason     
        throw Error(e)
    }
}

exports.deleteFinancier = async function (id, userId) {
    // Delete the Financier
    try {
        var obj = Financier.find({_id: id})
        var deleted = await Financier.remove({_id: id})
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Financier Could not be deleted")
        } else {
            var log = new Log({
                user: userId,
                object: id,
                oldValue: JSON.stringify(obj),
                action: 'Financier object is deleted'
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
exports.getFinanciers = async function (userId) { 
    // Options setup for the mongoose paginate
/*    var options = {
        page,
        limit
    }*/
    // Try Catch the awaited promise to handle the error 
    try {
        var Financiers = await Financier.find()
        if(Financiers){
            var listIds = []
            for(let i=0;i<Financiers.length;i++){
                listIds.push(Financiers[i]._id)
                if(i==Financiers.length-1){
                    var log = new Log({
                        user: userId,
                        object: listIds.toString(),
                        oldValue: JSON.stringify(Financiers),
                        action: 'Financier object list is requested'
                    })
                    log.save(function(err,doc){
                        if(err){
                            throw Error(err)
                        } else if(doc){
                            return Financiers;
                        }
                    });
                }
            }
        }
        // Return the Financierd list that was retured by the mongoose promise
        return Financiers;
       } catch (e) {
        // return a Error message describing the reason 
        throw Error(e);
    }
}

exports.getFinancier = async function(id, userId){
    try {
        var found = await Financier.findOne({_id: id})
        if(found){
            var log = new Log({
                user: userId,
                object: found._id,
                oldValue: JSON.stringify(found),
                action: 'Financier object is requested'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                } else if(doc){
                    return found;
                }
            });
        }
        // Return the Financier list that was retured by the mongoose promise
        return found;
       } catch (e) {
        // return a Error message describing the reason 
        throw Error(e);
    }
}

exports.deleteFinancierList = async function(list, userId) {
    try {
        var objs = Financier.find({_id: list})
        await Financier.deleteMany({_id: list}, function(error){
            if(error)
                throw Error(error.error);
            else {
                var log = new Log({
                    user: userId,
                    object: list,
                    oldValue: JSON.stringify(objs),
                    action: 'Financier objects are deleted'
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