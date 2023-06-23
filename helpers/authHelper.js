// const config = require("../config/constants");
// const jwt = require("jsonwebtoken");

// exports.auth = (req, res, next) => {
//   const authToken = req.headers.authorization
//     ? req.headers.authorization
//     : null;
//   const auth = authToken ? authToken.split(" ") : "";
//   const token = auth[1] ? auth[1] : "";

//   if (!token) {
//     return res
//       .status(400)
//       .send({ Status: "Failed", msg: "Access denied", statusCode: 400 });
//   }
//   try {
//     const verified = jwt.verify(token, config.secret);
//     req.user = verified;
//     next();
//   } catch (err) {
//     console.log(err, "error@catch");
//     res
//       .status(401)
//       .send({ Status: "Failed", msg: "Token expired", statusCode: 401 });
//   }
// };
