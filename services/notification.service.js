var Notification = require('../models/notification.model');
var Log = require('../models/log.model');

exports.createNotification = async function (user, userId) {
    // Creating a new Mongoose Object by using the new keyword
    var newNotification = new Notification({
        name: user.name,
    })

    try {
        // Saving the Notification 
        var savedNotification = await newNotification.save();
        if(savedNotification){
            var log = new Log({
                user: userId,
                object: savedNotification._id,
                newValue: JSON.stringify(savedNotification),
                action: 'Notification object is created'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                } else if(doc){
                    return savedNotification
                }
            });
        }
        return savedNotification;
    } catch (e) {
        // return a Error message describing the reason     
        throw Error(e)
    }
}

exports.updateNotification = async function (Notification, userId) {
    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the Notification 
        var _updateNotification = await Notification.findOne({ _id: Notification._id });
        var old = _updateNotification
        _updateNotification.name = Notification.name;
        var final = await _updateNotification.save();
        if(final){
            var log = new Log({
                user: userId,
                object: final._id,
                oldValue: JSON.stringify(old),
                newValue: JSON.stringify(final),
                action: 'Notification object is updated'
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

exports.deleteNotification = async function (id, userId) {
    // Delete the Notification
    try {
        var obj = Notification.find({_id: id})
        var deleted = await Notification.remove({_id: id})
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Notification Could not be deleted")
        } else {
            var log = new Log({
                user: userId,
                object: id,
                oldValue: JSON.stringify(obj),
                action: 'Notification object is deleted'
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
exports.getNotifications = async function (role, userId) { 
    // Options setup for the mongoose paginate
/*    var options = {
        page,
        limit
    }*/
    // Try Catch the awaited promise to handle the error 
    try {
        var Categories = await Notification.find({role: role})
        if(Categories){
            var listIds = []
            for(let i=0; i<Categories.length; i++){
                listIds.push(Categories[i]._id)
                if(i==Categories.length-1){
                    var log = new Log({
                        user: userId,
                        object: listIds.toString(),
                        oldValue: JSON.stringify(Categories),
                        action: 'Notification object list is requested'
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
        // Return the Notificationd list that was retured by the mongoose promise
        return Categories;
    } catch (e) {
        // return a Error message describing the reason 
        throw Error(e);
    }
}

exports.deleteNotificationList = async function(list, userId) {
    try {
        var objs = Notification.find({_id: list})
        await Notification.deleteMany({_id: list}, function(error){
            if(error)
                throw Error(error.error);
            else {
                var log = new Log({
                    user: userId,
                    object: list.toString(),
                    oldValue: JSON.stringify(objs),
                    action: 'Notification object list is deleted'
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

exports.getNotification = async function(id, userId){
    try {
        var found = await Notification.findOne({_id: id})
        if(found){
            var log = new Log({
                user: userId,
                object: found._id,
                oldValue: JSON.stringify(found),
                action: 'Notification object is requested'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                } else if(doc){
                    return found
                }
            });
        }
        return found
    } catch(e){
        throw Error(e);
    }
}