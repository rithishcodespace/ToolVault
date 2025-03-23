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

patchRoute.patch("/addCartItemsCount/:table/:id", (req, res) => {
  try {
    const table = req.params.table;
    const id = req.params.id;

    let sql1 = `UPDATE ?? SET stock = stock - 1 WHERE id = ?`;
    db.query(sql1, [table, id], (error, result) => {
      if (error) {
        console.error("Error updating stock in main table:", error);
        return res.status(500).send({ errorMessage: error });
      }

      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Item not found in main table" });
      }

      let sql2 = `UPDATE cart SET stock = stock + 1 WHERE id = ?`;
      db.query(sql2, [id], (error, result) => {
        if (error) {
          console.error("Error updating stock in cart:", error);
          return res.status(500).send({ errorMessage: error });
        }

        if (result.affectedRows === 0) {
          return res.status(404).send({ message: "Item not found in cart" });
        }

        res.status(200).send("Stock count updated successfully");
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send({ errorMessage: error });
  }
});

patchRoute.patch("/removeCartItemsCount/:table/:id", (req, res) => {
  try {
    const table = req.params.table;
    const id = req.params.id;

    let sql1 = `UPDATE ?? SET stock = stock + 1 WHERE id = ?`;
    db.query(sql1, [table, id], (error, result) => {
      if (error) {
        console.error("Error updating stock in main table:", error);
        return res.status(500).send({ errorMessage: error });
      }

      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Item not found in main table" });
      }

      let sql2 = `UPDATE cart SET stock = stock - 1 WHERE id = ?`;
      db.query(sql2, [id], (error, result) => {
        if (error) {
          console.error("Error updating stock in cart:", error);
          return res.status(500).send({ errorMessage: error });
        }

        if (result.affectedRows === 0) {
          return res.status(404).send({ message: "Item not found in cart" });
        }

        res.status(200).send("Stock count decreased successfully");
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send({ errorMessage: error });
  }
});


module.exports = patchRoute;