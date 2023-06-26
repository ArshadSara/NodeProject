var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schoolSchema = new Schema({
    "schoolName" : String,
    "schoolDiscription": String,
    "rig": String,
    "teacherId": String,
    "schoolPrinciple": String,
    "image": String,
    "teacherId":{ type: Schema.Types.ObjectId, ref: "teacher" },
    "address": String,
    "city": String,
    "zipcode": String,
    "state": String,
    "country": {type: String, default: "India" },
    "status":  {type: String, default: "Active" },
    "isDeleted": {type: Boolean, default: false },
    "createdDate": { type: Date, default: Date.now },
    "updatedDate": { type: Date },
});
module.exports = mongoose.model('school', schoolSchema);