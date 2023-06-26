const jwt = require("jsonwebtoken");
var TeacherModel = require("../models/teacher");

/**
 * Teacher Login
 *
 * @type POST
 *
 * @param {email} req - String
 * @param {password} req - String
 *
 */
exports.teacherLogin = function (req, res) {
  if (
    req.body.email &&
    req.body.email != "" &&
    req.body.password &&
    req.body.password != ""
  ) {
    const email = req.body.email.toLowerCase().trim();
    TeacherModel.findOne({
      email,
      isDeleted: false,
      role: req.body.role,
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
 * Teacher Forgot Password
 *
 * @type POST
 *
 * @param {email} req - String
 *
 */
exports.teacherForgotPassword = function (req, res) {
  try {
    if (
      req.body.email &&
      req.body.email != ""
    ) {
    const email = req.body.email.toLowerCase().trim();
    TeacherModel.find(
        { email: email, isDeleted: false, status: "Active" },
        function (err, user) {
          if (err) {
            res.send({ Status: "Failed", msg: "Invalid User" });
          } else {
            // if (user.length != 0) {
            //   var 
            //   TeacherModel.update(
            //     { password: setpassword },
            //     function (err) {
            //       if (err) {
            //         res.send({
            //           Status: "Failed",
            //           msg: "Password updation failed",
            //         });
            //       } else {
            //         users.update(
            //           { _id: req.body.id },
            //           { token: "" },
            //           function (err, result) {
            //             if (err) {
            //               res.send({
            //                 Status: "Failed",
            //                 msg: "Updation Failed",
            //               });
            //             } else {
            //               res.send({
            //                 Status: "Success",
            //                 msg: "Password created successfully",
            //               });
            //             }
            //           }
            //         );
            //         // res.send({ Status: "Success", msg: "Password updated successfully" })
            //       }
            //     }
            //   );
            // } else {
            //   res.send({ Status: "Failed", msg: "Data not available" });
            // }
          }
        }
      );
    } else {
      res.send({ Status: "Failed", msg: "Invalid request" });
    }
  } catch (e) {
    res.send({ Status: "Failed", msg: "Problem while sending the data" });
  }
};
