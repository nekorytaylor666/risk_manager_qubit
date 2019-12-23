var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var ProjectRoleSchema = new mongoose.Schema({
    name: String,
    created: {
        type: Date,
        default: Date.now
    }
})
ProjectRoleSchema.plugin(mongoosePaginate)
const ProjectRole = mongoose.model('ProjectRoles', ProjectRoleSchema)

module.exports = ProjectRole;