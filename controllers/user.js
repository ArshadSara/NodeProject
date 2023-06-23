
var fs = require("fs");
var User = require("../models/user");
const path = require("path")

/**
 * Insert Sample User Object
 *
 * @type GET
 *
 */
exports.postSampleObj = async function (req, res) {
  const filePath = path.join("__dirname", "../jsonFiles/user.json");
  const data = fs.readFileSync(filePath,'utf-8');
  const result = new User(JSON.parse(data))
  await User.create(result);
  return res.send({"status":"success"})
 };