const express = require("express");
const authRoute = express.Router();
const db = require("../database.js")
const validate = require("../utils/Validator.jsx");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

authRoute.post("/signup",async(req,res)=>{
    try{
        validate(req);
        let sql = "insert into users(username,emailId,password,role) values (?,?,?,?)";
        const {password} = req.body;
        const hassedPassword = await bcrypt.hash(password,10);
        const values = [req.body.username,req.body.emailId,hassedPassword,req.body.role];
        db.query(sql,values,(error,result)=>{
            if(error)
            {
                return res.send("There is an error in signing you up!");
            }
            return res.send("User signed up successfully!");
        })
    }
    catch(error)
    {
        return res.send(error);
    }
})

authRoute.post("/signin",(req,res)=>{
    try{
        validate(req);
        let sql = "select * from users where emailId = ?";
        const values = [req.body.emailId];
        db.query(sql,values,async(error,result)=>{
            if (error) {
                return res.status(500).send("Database error: " + error.message);
            }
            if (result.length === 0) {
                return res.status(401).send("Invalid email or password!");
            }
            let user = result[0]
            let isMatch = await bcrypt.compare(req.body.password,user.password);
            if(!isMatch)return res.status(500).send("user not found!");
            const token = jwt.sign({"id":req.body.id,},"jwtsecretkey",{expiresIn:"1hr"})
            res.cookie("token",token,{httpOnly: true,maxAge: 3600000});
            res.status(200).send(result[0]); 
        })
    }
    catch(error)
    {
        res.send("invalid credentials");
    }
})

module.exports = authRoute;