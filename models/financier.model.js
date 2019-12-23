var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
//var Project = require('./project.model')

var FinancierSchema = new mongoose.Schema({
    fio: String,
    phone: String,
    projects: [mongoose.Schema.Types.ObjectId],
    created: {
        type: Date,
        default: Date.now
    }
})
FinancierSchema.plugin(mongoosePaginate)
const Financier = mongoose.model('Financiers', FinancierSchema)

module.exports = Financier;