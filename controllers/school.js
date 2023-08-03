var SchoolModel = require("../models/school");

/**
 * Teacher Information
 *
 * @type GET
 *
 */
exports.teacherGetDetails = function (req, res) {
  var quary = {
    _id: req.params._id,
    isDeleted: false,
    status: "Active",
  };
  TeacherModel.findOne(
    quary
  ).then((responce) => {
    if (responce) {
      res.send({
        Status: "Success",
        msg: "Teacher Information Get successfully",
        data: responce
      });
    }
  });
};

/**
 * Teacher Create
 *
 * @type POST
 *
 */
exports.schoolCreate = function (req, res) {
  var quary ={
    $or:[{email:req.body.email},{phone:req.body.phone}],
    isDeleted: false,
    role: "Teacher",
    status: "Active",
  }
 TeacherModel.findOne(quary).then(async(user) => {
      if (user) {
        if(req.body.email == user.email){
          res.send({
            Status: "Failed",
            msg: "Email All Ready Exist.",
          });
        }else if (req.body.phone == user.phone){
          res.send({
            Status: "Failed",
            msg: "Phone Number All Ready Exist.",
          });
        }
      } else{
        var newObj ={
          title: "",
          firstName: req.body && req.body.firstName,
          lastName: req.body && req.body.lastName,
          fullName: `${req.body && req.body.firstName} ${req.body && req.body.lastName}`,
          image: "",
          dob:  "",
          phone: req.body && req.body.phone,
          altPhone:"",
          email: req.body && req.body.email,
          altEmail:"",
          password: req.body && req.body.password,
          gender: "",
          teacherRole: "",
          address: "",
          city: "",
          zipcode: "",
          state: "",
          isDeleted: false
        }
        const result = new TeacherModel(newObj)
        await TeacherModel.create(result);
        return res.send({"status":"200", "message": "Teacher create successfully"})
      }
    });
};

/**
 * Teacher Create
 *
 * @type POST
 *
 */
exports.schoolUpdate = function (req, res) {
  var quary ={
    _id: req.body._id,
    isDeleted: false,
    role: "Teacher",
    status: "Active",
  }
  var newObj ={
    title: req.body && req.body.firstName ? req.body.title: "",
    firstName: req.body && req.body.firstName,
    lastName: req.body && req.body.lastName,
    fullName: `${req.body && req.body.firstName} ${req.body && req.body.lastName}`,
    image: "",
    dob: req.body && req.body.dob ? req.body.dob : "",
    // phone: req.body && req.body.phone,
    altPhone: req.body && req.body.altPhone ? req.body.altPhone : "",
    // email: req.body && req.body.email,
    altEmail: req.body && req.body.altEmail ? req.body.altEmail : "",
    gender: req.body && req.body.gender ? req.body.gender : "",
    teacherRole: req.body && req.body.teacherRole ? req.body.teacherRole : "",
    address: req.body && req.body.address ? req.body.address : "",
    city: req.body && req.body.city ? req.body.city : "",
    zipcode: req.body && req.body.zipcode ? req.body.zipcode : "",
    state: req.body && req.body.state ? req.body.state : "",
    isDeleted: false
  }
 TeacherModel.findOneAndUpdate(quary, { $set: newObj },
  { new: true }).then(async(user) => {
    console.log(user)
      if (user) {
        await res.send({"status":"200", "message": "Teacher Update successfully"})
      }
    });
};
