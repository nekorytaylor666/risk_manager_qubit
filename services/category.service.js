var Category = require('../models/category.model');
var Log = require('../models/log.model');

exports.createCategory = async function (category, userId) {
    // Creating a new Mongoose Object by using the new keyword
    var newCategory = new Category({
        name: category.name,
    })

    try {
        // Saving the Category 
        var savedCategory = await newCategory.save();
        if(savedCategory){
            var log = new Log({
                user: userId,
                object: savedCategory._id,
                newValue: JSON.stringify(savedCategory),
                action: 'New Category object is created'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                } else if(doc){
                    return savedCategory;
                }
            });
        } else
            return savedCategory;
    } catch (e) {
        // return a Error message describing the reason     
        throw Error(e)
    }
}

exports.updateCategory = async function (category, userId) {
    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the Category 
        var _updateCategory = await Category.findOne({ _id: category._id });
        var old = _updateCategory
        _updateCategory.name = category.name;
        var final = await _updateCategory.save();
        if(final){
            var log = new Log({
                user: userId,
                object: final._id,
                oldValue: JSON.stringify(old),
                newValue: JSON.stringify(final),
                action: 'Category object is updated'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                } else if(doc){
                    return final;
                }
            });
        }
        return final;
    } catch (e) {
        // return a Error message describing the reason     
        throw Error(e)
    }
}

exports.deleteCategory = async function (id, userId) {
    // Delete the Category
    try {
        var obj = await Category.find({_id: id})
        var deleted = await Category.remove({_id: id})
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Category Could not be deleted")
        } else {
            var log = new Log({
                user: userId,
                object: id,
                oldValue: JSON.stringify(obj),
                action: 'Category object is deleted'
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
exports.getCategories = async function (userId) { 
    // Options setup for the mongoose paginate
/*    var options = {
        page,
        limit
    }*/
    // Try Catch the awaited promise to handle the error 
    try {
        var Categories = await Category.find()
        if(Categories){
            var listIds = ''
            for(let i=0;i<Categories.length;i++){
                listIds += Categories[i]._id + ', '
                if(i==Categories.length-1){
                    var log = new Log({
                        user: userId,
                        object: listIds,
                        oldValue: JSON.stringify(Categories),
                        action: 'Categories list is requested'
                    })
                    log.save(function(err,doc){
                        if(err){
                            throw Error(err)
                        } else if(doc){
                            return Categories;
                        }
                    });
                }
            }
        }
        // Return the Categoryd list that was retured by the mongoose promise
        return Categories;
    } catch (e) {
        // return a Error message describing the reason 
        throw Error(e);
    }
}

exports.deleteCategoryList = async function(list, userId) {
    try {
        var objs = Category.find({_id: list})
        await Category.deleteMany({_id: list}, function(error){
            if(error)
                throw Error(error.error);
            else {
                var log = new Log({
                    user: userId,
                    object: list.toString(),
                    oldValue: JSON.stringify(objs),
                    action: 'Category objects are deleted'
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

exports.getCategory = async function(id, userId){
    try {
        var found = await Category.findOne({_id: id})
        if(found){
            var log = new Log({
                user: userId,
                object: found._id,
                oldValue: JSON.stringify(found),
                action: 'Category object is requested'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                } else if(doc){
                    return found;
                }
            });
        }
        return found
    } catch(e){
        throw Error(e);
    }
}