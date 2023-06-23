var mongoose = require("mongoose");
// slug = require('mongoose-slug-updater');
// mongoose.plugin(slug);
var Schema = mongoose.Schema;

var userSchema = new Schema({
    "title" : String,
    "firstName": String,
    "lastName": String,
    "fullName": String,
    "image": String,
    "phone": String,
    "email": String,
    "password": String,
    "gender": String,
    "token": String,
    "address": String,
    "city": String,
    "state": String,
    "country": {type: String, default: "India" },
    "status":  {type: String, default: "active" },
    "isDeleted": {type: Boolean, default: false },
    "createdDate": { type: Date, default: Date.now },
    "updatedDate": { type: Date },
});
module.exports = mongoose.model('user', userSchema);