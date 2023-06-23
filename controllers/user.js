
var fs = require("fs");
var user = require("../models/user");
const path = require("path")

/**
 * Insert Sample User Object
 *
 * @type GET
 *
 */
exports.postSampleObj = async function (req, res) {
  const filePath = path.join("__dirname", "../jsonFiles/user.json");
  const data = fs.readFileSync(filePath,'utf-8') ;
  await user.create({...data});

return res.send({"status":"success"})
 };