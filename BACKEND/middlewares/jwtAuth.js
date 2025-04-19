const jwt = require("jsonwebtoken");
const db = require("../database");

let jwtAuth = (req, res, next) => {
  const token = req.cookies;

  if (!token) {
    return res.status(401).send({ error: "Token doesn't exist!" });  // Use 401 for Unauthorized
  }

  try {
    // Decode the token
    const decodedMessage = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);  // use your actual secret here

    // Check the user in the database
    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [decodedMessage.id], (error, result) => {
      if (error) {
        return res.status(500).send({ error: "Database error: " + error.message });
      }

      if (result.length === 0) {
        return res.status(401).send({ error: "User not found!" });  // 401 for invalid user
      }

      // Add user to request object
      req.user = result[0];
      next();  // Proceed to the next middleware or route handler
    });
  } catch (error) {
    return res.status(401).send({ error: "Invalid or expired token!" });  // Catch invalid token errors
  }
};

module.exports = jwtAuth;
