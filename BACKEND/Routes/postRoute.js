const express = require("express");
const postRoute = express.Router();
const db = require("../database");

postRoute.post("/addtocart",(req,res)=>{
    try{
      let sql = "insert into cart values (?,?,?,?,?)";
      const values = [req.body.id,req.body.img,req.body.name,req.body.details,req.body.tablename];
      db.query(sql,values,(error,result)=>{
        if(error)res.status(500).send("item cannot be added to cart"); 
        else res.status(200).send("Added to cart successfully!");
      })
    }
    catch(error)
    {
        res.status(500).send({"errorMessage":error});
    }
})

postRoute.post("/addcard/:table",(req,res)=>{
  try{
    const table = req.params.table;
    let sql = `INSERT INTO ${table} (img, name, details, rate, extradetails, stock) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [req.body.img,req.body.name,req.body.details,req.body.rate,req.body.extradetails,req.body.stock];
    db.query(sql,values,(error,result)=>{
      if(error) res.status(500).send({"errorMessage":error});
      else res.send("card added successfully!");
    })
  }
  catch(error)
  {
    res.status(500).send({"errorMessage":error});
  }
})

module.exports = postRoute;