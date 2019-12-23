var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var CategorySchema = new mongoose.Schema({
    name: String,
    created: {
        type: Date,
        default: Date.now
    }
})
CategorySchema.plugin(mongoosePaginate)
const Category = mongoose.model('Categories', CategorySchema)

module.exports = Category;