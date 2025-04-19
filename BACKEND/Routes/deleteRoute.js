const express = require("express");
const deleteRoute = express.Router();
const db = require("../database");
const jwtAuth = require("../middlewares/jwtAuth");

deleteRoute.delete("/removecard/:table/:id",(req,res)=>{
    try{
      const table = req.params.table;
      const id = parseInt(req.params.id, 10);
      let sql = "delete from ?? where id = ?";
      db.query(sql,[table,id],(error,result)=>{
        if(error) res.status(500).send({"errorMessage":error});
        else res.status(200).send("card deleted successfully from db")
      })
    }
    catch(error)
    {
        res.status(500).send({"errorMessage":error});
    }
})

module.exports = deleteRoute;