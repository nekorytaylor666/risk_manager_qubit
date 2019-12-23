var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
    login: {type: String, unique: true},
    password: String,
    email: String,
    phone: {type: String, unique: true},
    bin: String,
    organisation: String,
    address: String,
    fioDirector: String,
    registration: String,
    role: String,
    created: {
        type: Date,
        default: Date.now
    },
    manager: String,//mongoose.Schema.Types.ObjectId,//Manager,
    lawyer: String,//mongoose.Schema.Types.ObjectId,//Manager,
    financier: String//mongoose.Schema.Types.ObjectId,//Manager,
})
UserSchema.plugin(mongoosePaginate)
UserSchema.plugin(uniqueValidator, {message: "Значение существует в базе. Поменяйте."});
const User = mongoose.model('Users', UserSchema)

module.exports = User;