//--Exports--//
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const fs = require("fs");
const apis = require("./routes/routes");
//--Exports--//

//--Limit of Api--//
app.use(
  bodyParser.json({
    limit: "500mb",
  })
);
//--Limit of Api--//

// -- Request in Body--//
app.use(bodyParser.urlencoded({ extended: false }));
// -- Request in Body--//

//-- headers --//
app.use(function (req, res, next) {
  //allow cross origin requests
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, PUT, OPTIONS, DELETE, GET"
  );
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
//-- headers --//

//-- files Read --//
var dir1 = "public";
if (!fs.existsSync(dir1)) {
  fs.mkdirSync(dir1);
}
//-- files Read --//

// -- Access-Public-//
app.use(cors());
app.use("/public", express.static("public"));
// -- Access-Public-//

//--Mongos Connection--//
var dbConfig = "./config/dbconnection.js";
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
//--Mongos Connection--//

//--APi Check work or not--//
mongoose.connection.on("error", function (err) {
  console.log(err);
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});
mongoose.connection.once("open", function () {
  console.log("Successfully connected to the database");
});
const PORT = process.env.PORT || 1901;
app.listen(PORT, () => {
  console.log("Server is running on PORT " + PORT);
});
//--APi Check work or not--//

//--- API Trigger Default ---//
app.use("/", apis);
//--- API Trigger Default ---//

