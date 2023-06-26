var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var teacherSchema = new Schema({
    "title" : String,
    "firstName": String,
    "lastName": String,
    "fullName": String,
    "image": String,
    "dob": String,
    "phone": String,
    "altPhone": String,
    "email": String,
    "altEmail": String,
    "gender": String,
    "password": String,
    "teacherRole": String,
    "address": String,
    "city": String,
    "zipcode": String,
    "state": String,
    "role":  {type: String, default: "Teacher" },
    "country": {type: String, default: "India" },
    "status":  {type: String, default: "Active" },
    "isDeleted": {type: Boolean, default: false },
    "createdDate": { type: Date, default: Date.now },
    "updatedDate": { type: Date },
});
module.exports = mongoose.model('teacher', teacherSchema);