const express = require("express");
const fetchRoute = express.Router();
const db = require("../database")

fetchRoute.get("/get/:table",(req,res)=>{
    try{
        const table = req.params.table;
        let sql = `select * from ${table}`;
        db.query(sql,(error,result)=>{
            if(error)
            {
                res.status(500).send({"errorMessage":error});
            }
            else res.status(200).send(result);
        })
    }
    catch(error)
    {
        res.status(500).send({"errorMessage":error});
    }
})

fetchRoute.get("/get/:table/:id",(req,res)=>{
    try{
        const table = req.params.table;
        const id = req.params.id;
        let sql = `select * from ${table} where id = ${id}`;
        db.query(sql,(error,result)=>{
          if(error) res.status(500).send({"errorMessage":error});
          else res.status(200).send(result[0])
        })
    }
    catch(error)
    {
        res.status(500).send({"errorMessage":error})
    }
})

fetchRoute.get("/getcart",(req,res)=>{
    try{
      let sql = "select * from cart";
      db.query(sql,(error,result)=>{
        if(error) res.status(500).send({"errorMessage":error});
        else res.status(200).send(result);
      })
    }
    catch(error)
    {
        res.status.send({"errorMessage":error})
    }
})

fetchRoute.get("/getminicards",(req,res)=>{
    try{
      let sql = "select * from minicards";
      db.query(sql,(error,result)=>{
        if(error)res.status(500).send("There is an error in fetching minicards");
        else res.status(200).send(result);
      })
    }
    catch(error)
    {
       res.status(500).send({"errorMessage":error});
    }
})

module.exports = fetchRoute;