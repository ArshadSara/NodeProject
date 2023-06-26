
var fs = require("fs");
var User = require("../models/user");
var Teacher = require("../models/teacher");
const path = require("path")

/**
 * Insert Sample User Object
 *
 * @type GET
 *
 */
exports.postSampleObj = async function (req, res) {
  console.log("1")
  const filePath = path.join("__dirname", "../jsonFiles/teacher.json");
  const data = fs.readFileSync(filePath,'utf-8');
  const result = new Teacher(JSON.parse(data))
  await Teacher.create(result);
  return res.send({"status":"success"})
 };