const express = require("express");
const patchRoute = express.Router();
const db = require("../database");

patchRoute.patch("/editcard/:table/:id",(req,res)=>{
    try{
      const table = req.params.table;
      const id = req.params.id;
      let sql = `update ${table} set img = ?, name = ?, details = ?, rate = ?, extradetails = ?, stock = ? where id = ${id}`; //upto here
      const values = [req.body.img,req.body.name,req.body.details,req.body.rate,req.body,extradetails,req.body.stock]; 
      db.query(sql,values,(error,result)=>{
        if(error) res.status(500).send({"errorMessage":error});
        else res.status(200).send("card edited successfully from db")
      })
    }
    catch(error)
    {
        res.status(500).send({"errorMessage":error});
    }
})

module.exports = patchRoute;