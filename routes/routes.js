const express = require("express");
const router = express.Router();
// var multer = require("multer");
// var upload = multer({ storage: multer.memoryStorage() });

// *********  Routes API'S  ********** //
var user = require("../controllers/user");
var teacher = require("../controllers/teacher");
var student = require("../controllers/student");
var user = require("../controllers/user");

// -- Sample Object Insert -- //
router.post("/user/postSampleObject", user.postSampleObj);
// -- Sample Object Insert -- //

//---GET---//

//---GET---//

//---POST---//
router.post("/teacher/login", teacher.teacherLogin);
//---POST---//

//---PUT---//
//---PUT---//

// *********  Routes API'S  ********** //

module.exports = router;
