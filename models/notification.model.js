var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
//var Project = require('./project.model')

var NotificationSchema = new mongoose.Schema({
    projectID: mongoose.Schema.Types.ObjectId,
    projectName: String,
    projectOrganisation: String,
    text: String,
    role: String,
    created: {
        type: Date,
        default: Date.now
    }
})
NotificationSchema.plugin(mongoosePaginate)
const Notification = mongoose.model('Notifications', NotificationSchema)

module.exports = Notification;