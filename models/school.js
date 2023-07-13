var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schoolSchema = new Schema({
    "schoolName" : String,
    "schoolDiscription": String,
    "rig": String,
    "schoolPrincipleName": String,  
    "schoolRelatedYears": [{
        "years": { type: String, trim: true},
    }],
    "image": String,
    "principalId":{ type: Schema.Types.ObjectId, ref: "principal" },
    "schoolId":{ type: Schema.Types.ObjectId, ref: "school" },
    "address": String,
    "city": String,
    "zipcode": String,
    "state": String,
    "country": {type: String, default: "India" },
    "status":  {type: String, default: "Active" },
    "isDeleted": {type: Boolean, default: false },
    "createdDate": { type: Date, default: Date.now },
    "updatedDate": { type: Date, default: Date.now },
});
module.exports = mongoose.model('school', schoolSchema);