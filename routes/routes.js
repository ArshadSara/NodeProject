const express = require("express");
const router = express.Router();
// var multer = require("multer");
// var upload = multer({ storage: multer.memoryStorage() });

// *********  Routes API'S  ********** //
var user = require("../controllers/user");
//---GET---//
router.get("/user/profile", user.getUserProfile);
//---GET---//

//---POST---//
//---POST---//

//---PUT---//
//---PUT---//

// *********  Routes API'S  ********** //

module.exports = router;
