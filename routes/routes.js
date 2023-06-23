const express = require("express");
const router = express.Router();
// var multer = require("multer");
// var upload = multer({ storage: multer.memoryStorage() });

// *********  Routes API'S  ********** //
var user = require("../controllers/user");

// -- Sample Object Insert -- //
router.post("/user/postSampleObject", user.postSampleObj);
// -- Sample Object Insert -- //

//---GET---//
//---GET---//

//---POST---//
//---POST---//

//---PUT---//
//---PUT---//

// *********  Routes API'S  ********** //

module.exports = router;
