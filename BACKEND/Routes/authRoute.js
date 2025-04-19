const express = require("express");
const authRoute = express.Router();
const db = require("../database.js");
const validate = require("../utils/Validator.jsx");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

authRoute.use(cookieParser()); // Middleware to read cookies

authRoute.post("/signup", async (req, res) => {
  try {
    validate(req);
    let sql = "INSERT INTO users(username, emailId, password, role) VALUES (?, ?, ?, ?)";
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const values = [req.body.username, req.body.emailId, hashedPassword, req.body.role];

    db.query(sql, values, (error, result) => {
      if (error) {
        return res.status(500).json({ errorMessage: error.message });
      }
      return res.send("User signed up successfully!");
    });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
});

authRoute.post("/signin", async (req, res) => {
    try {
      validate(req);
      let sql = "SELECT * FROM users WHERE emailId = ?";
      const values = [req.body.emailId];
  
      db.query(sql, values, async (error, result) => {
        if (error) {
          return res.status(500).json({ errorMessage: error.message });
        }
        if (result.length === 0) {
          return res.status(401).json({ errorMessage: "Invalid email or password!" });
        }
  
        const user = result[0];
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(401).json({ errorMessage: "Invalid email or password!" });
  
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
  
        // Store refresh token in DB
        const storeToken = "UPDATE users SET refreshToken = ? WHERE id = ?";
        db.query(storeToken, [refreshToken, user.id], (error) => {
          if (error) {
            console.error("Error saving refresh token", error);
          }
        });
  
        // Set cookies
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: 15 * 60 * 1000, // 15 min -> access token time
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
  
        // Send a response with user data
        res.status(200).json({
          message: "Signed in successfully",
          role: user.role,  // Add the role or any other info you need
          accessToken: accessToken,
          refreshToken: refreshToken
        });
      });
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  });
  
authRoute.post("/refresh", (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  const sql = "SELECT * FROM users WHERE refreshToken = ?";
  db.query(sql, [token], (error, result) => {
    if (error || result.length === 0) {
      return res.status(403).json({ errorMessage: "Invalid refresh token" });
    }

    const user = result[0];
    try {
      const decodedMessage = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET); //it decodes the token
      if (!decodedMessage) return res.status(403).send("Invalid refresh token");

      const newAccessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

      // Set new access token in cookie
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      });

      res.json({ message: "Access token refreshed" });
    } catch (error) {
      return res.status(403).json({ errorMessage: error.message });
    }
  });
});

authRoute.delete("/signout", (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(400);

  const sql = "UPDATE users SET refreshToken = NULL WHERE refreshToken = ?";
  db.query(sql, [token], (error) => {
    if (error) return res.sendStatus(500);

    // Clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.sendStatus(204); // No content
  });
});

module.exports = authRoute;
