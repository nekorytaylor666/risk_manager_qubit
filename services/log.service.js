var Log = require('../models/log.model');

exports.createLog = async function (object, userId) {
    // Creating a new Mongoose Object by using the new keyword
    var newCategory = new Log({
        user: userId,
        object: null,
        oldValue: object.oldValue,
        newValue: object.newValue,
        action: object.action
    })

    try {
        // Saving the Category 
        var savedCategory = await newCategory.save();
        return savedCategory;
    } catch (e) {
        // return a Error message describing the reason     
        throw Error(e)
    }
}
