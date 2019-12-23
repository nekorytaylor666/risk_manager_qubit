var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
//var Project = require('./project.model')

var ManagerSchema = new mongoose.Schema({
    fio: String,
    phone: String,
    projects: [ {type:mongoose.Schema.Types.ObjectId, ref: "Projects"} ],
    created: {
        type: Date,
        default: Date.now
    }
})
ManagerSchema.plugin(mongoosePaginate)
const Manager = mongoose.model('Managers', ManagerSchema)

module.exports = Manager;