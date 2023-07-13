const express = require("express");
const router = express.Router();
// var multer = require("multer");
// var upload = multer({ storage: multer.memoryStorage() });

// *********  Routes API'S  ********** //
var user = require("../controllers/user");
var teacher = require("../controllers/teacher");
var principal = require("../controllers/principal");
var user = require("../controllers/user");
const principal = require("../models/principal");

// -- Sample Object Insert -- //
router.post("/user/postSampleObject", user.postSampleObj);
// -- Sample Object Insert -- //

//----------------------------API---------------------------//

//-------------------Admin API------------------------//
//-------------------Admin API------------------------//


//-------------------Principal API------------------------//
//---GET---//
router.get("/principal/information/:id", principal.principalGetDetails);
//---GET---//

//---POST---//
router.post("/principal/login", principal.principalLogin);
router.post("/principal/forgotpassword", principal.principalForgotPassword);
router.post("/principal/changepassword", principal.principalChangePassword);
router.post("/principal/create", principal.principalCreate);
router.post("/principal/update", principal.principalUpdate);
//---POST---//

//---PUT---//
//---PUT---//
//-------------------Principal API------------------------//


//-------------------School API------------------------//
//-------------------School API------------------------//


//-------------------Teacher API------------------------//
//---GET---//
router.get("/teacher/information/:id", teacher.teacherGetDetails);
//---GET---//

//---POST---//
router.post("/teacher/login", teacher.teacherLogin);
router.post("/teacher/forgotpassword", teacher.teacherForgotPassword);
router.post("/teacher/changepassword", teacher.teacherChangePassword);
router.post("/teacher/create", teacher.teacherCreate);
router.post("/teacher/update", teacher.teacherUpdate);
//---POST---//

//---PUT---//
//---PUT---//
//-------------------Teacher API------------------------//


//-------------------Student API------------------------//
//-------------------Student API------------------------//

//----------------------------API---------------------------//


module.exports = router;
