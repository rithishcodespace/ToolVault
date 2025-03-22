const express = require("express");
const authRoute = express.Router();
const db = require("../database.js")
const validate = require("../utils/Validator.jsx");

authRoute.post("/signup",(req,res)=>{
    try{
        validate(req);
        let sql = "insert into users(username,emailId,password,role) values (?,?,?,?)";
        const values = [req.body.username,req.body.emailId,req.body.password,req.body.role];
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
        let sql = "select * from users where emailId = ? and password = ?";
        const values = [req.body.emailId,req.body.password];
        db.query(sql,values,(error,result)=>{
            if(error || result.length==0)
            {
                res.send("There is an error in signing you up!");
            }
            res.send(result[0]);
        })
    }
    catch(error)
    {
        res.send("invalid credentials");
    }
})

module.exports = authRoute;