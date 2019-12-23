var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
//var Project = require('./project.model')

var LawyerSchema = new mongoose.Schema({
    fio: String,
    phone: String,
    projects: [mongoose.Schema.Types.ObjectId],
    created: {
        type: Date,
        default: Date.now
    }
})
LawyerSchema.plugin(mongoosePaginate)
const Lawyer = mongoose.model('Lawyers', LawyerSchema)

module.exports = Lawyer;