var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var LogSchema = new mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    action: String,
    object: String,
    newValue: String,
    oldValue: String,
    created: {
        type: Date,
        default: Date.now
    }
})
LogSchema.plugin(mongoosePaginate)
const Log = mongoose.model('Logs', LogSchema)

module.exports = Log;