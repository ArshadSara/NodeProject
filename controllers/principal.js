const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer")
var PrincipalModel = require("../models/principal");

/**
 * Principal Login
 *
 * @type POST
 *
 * @param {email} req - String
 * @param {password} req - String
 *
 */
exports.principalLogin = function (req, res) {
  if (
    req.body.email &&
    req.body.email != "" &&
    req.body.password &&
    req.body.password != ""
  ) {
    const email = req.body.email.trim();
    PrincipalModel.findOne({
      email:email,
      isDeleted: false,
      status: "Active",
    }).then((user) => {
      if (!user) {
        res.send({
          Status: "Failed",
          msg: "The email address or password you entered is not valid, Please try again.",
        });
      } else if (req.body.password != user.password) {
        res.send({
          Status: "Failed",
          msg: "The email address or password you entered is not valid, Please try again.",
        });
      } else {
        if (user.length != 0) {
          const payload = {
            _id: user._id,
          };
          jwt.sign(
            payload,
            "supersecret",
            {
              expiresIn: 7 * 86400, // expires in 7 days
            },
            (err, token) => {
              if (err) {
                res.send({
                  Status: "Failed",
                  msg: "There is some error in token",
                });
              } else {
                res.send({
                  Status: "Success",
                  token: `Bearer ${token}`,
                  msg: "login success",
                  id: user._id,
                  role:user.role,
                  fullName: user.fullName,
                  phone: user.phone,
                  email: user.email
                });
              }
            }
          );
        } else {
          res.send({ Status: "Failed" });
        }
      }
    });
  } else {
    res.send({ Status: "Failed", msg: "Please provide email and password." });
  }
};

/**
 * Principal Forgot Password
 *
 * @type POST
 *
 * @param {email} req - String
 *
 */
exports.principalForgotPassword = async function (req, res) {
  if (req.body.email && req.body.email != "") {
    const email = req.body.email.trim();
    var quary = {
      email: email,
      isDeleted: false,
      status: "Active",
    };
    await PrincipalModel.findOne(quary).then(async(user) => {
      if (user == null) {
        res.send({ Status: "Failed", msg: "Invalid User" });
      } else {
        var setpassword = {
          password: user.phone,
        };
        await PrincipalModel.findOneAndUpdate(
          quary,
          { $set: setpassword },
          { new: true }
        ).then(async(responce) => {
          if (responce) {
            await sendEmail(user.phone, user.email)
            res.send({
              Status: "Success",
              msg: "Password updated successfully",
            });
          }
        });
      }
    });
  } else {
    res.send({ Status: "Failed", msg: "Invalid request" });
  }
};

async function sendEmail(password, email){
  try{
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'arshadshaik0430@gmail.com',
        pass: "ijtagrcqvgswsssa"
      },
    });

    const mailOptions = {
      from: 'Support<arshadshaik0430@gmail.com>',
      to: email,
      subject: 'Forgot password',
      text: `Please use this Password for login${password}`,
    };
    await transport.sendMail(mailOptions, function(error, info){
      if(error){
         console.log(error);
      }else{
         console.log("Email sent: " + info.response);
      }
   });
  }catch(err){
    console.log(err)
    return err
  }
}

/**
 * Principal Change Password
 *
 * @type POST
 *
 */
exports.principalChangePassword = function (req, res) {
    var quary = {
      _id: req.body.userId,
      isDeleted: false,
      status: "Active",
    };
    var setUpdate = {
      password: req.body.newPassword,
    };
    PrincipalModel.findOneAndUpdate(
      quary,
      { $set: setUpdate },
      { new: true }
    ).then((responce) => {
      if (responce) {
        res.send({
          Status: "Success",
          msg: "Password updated successfully",
        });
      }
    });
};


/**
 * Principal Information
 *
 * @type GET
 *
 */
exports.principalGetDetails = function (req, res) {
  var quary = {
    _id: req.params._id,
    isDeleted: false,
    status: "Active",
  };
  PrincipalModel.findOne(
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
exports.principalCreate = function (req, res) {
  var quary ={
    $or:[{email:req.body.email},{phone:req.body.phone}],
    isDeleted: false,
    status: "Active",
  }
  PrincipalModel.findOne(quary).then(async(user) => {
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
          address: "",
          city: "",
          zipcode: "",
          state: "",
          isDeleted: false
        }
        const result = new PrincipalModel(newObj)
        await PrincipalModel.create(result);
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
exports.principalUpdate = function (req, res) {
  var quary ={
    _id: req.body._id,
    isDeleted: false,
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
  PrincipalModel.findOneAndUpdate(quary, { $set: newObj },
  { new: true }).then(async(user) => {
      if (user) {
        await res.send({"status":"200", "message": "Teacher Update successfully"})
      }
    });
};


// exports.teacherForgotPassword = function (req, res) {
//   if (req.body.email && req.body.email != "") {
//     const email = req.body.email.trim();
//     var quary = {
//       email: email,
//       isDeleted: false,
//       status: "Active",
//     };
//     TeacherModel.findOne(quary).then((user) => {
//       if (user == null) {
//         res.send({ Status: "Failed", msg: "Invalid User" });
//       } else {
//         var setpassword = {
//           password: user.phone,
//         };
//         TeacherModel.findOneAndUpdate(
//           quary,
//           { $set: setpassword },
//           { new: true }
//         ).then((responce) => {
//           if (responce) {
//             res.send({
//               Status: "Success",
//               msg: "Password updated successfully",
//             });
//           }
//         });
//       }
//     });
//   } else {
//     res.send({ Status: "Failed", msg: "Invalid request" });
//   }
// };