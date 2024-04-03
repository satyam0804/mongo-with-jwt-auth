// Middleware for handling auth
const jwt = require("jsonwebtoken");
const { JWT_Secret } = require("../index");
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

  const token = req.headers.authorization; // Bearer token
  const words = token.split(" "); // "Bearer", "token"
  const jwtToken = words[1]; // "token"

  const decodedToken = jwt.verify(jwtToken, JWT_Secret);

  try {
    if (decodedToken.username) {
      next();
    } else {
      res.status(403).json({
        msg: "You are not authenticated",
      });
    }
  } catch (err) {
    res.json({
      msg: "Incorrect inputs",
    });
  }
}

module.exports = adminMiddleware;
