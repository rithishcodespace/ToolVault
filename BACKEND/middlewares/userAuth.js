const jwt = require("jsonwebtoken");
const db = require("../database");

let userAuth = (req,res,next) =>{
  const {token} = req.cookies;
  if(!token)
  {
    return res.status(500).send("token doesn't exist!");
  }
  const decodedMessage = jwt.verify(token,"jwtsecretkey");
  const sql = "select * from users where id = ?"
  db.query(sql,[decodedMessage.id],(error,result)=>{
    try{
        if(error)return res.status(500).send({"error":error});
        if(result.length===0) return res.status(500).send({"error":error});
        req.user = result[0];
        next();
    }
    catch(error)
    {
      return res.status(500).send({"error":error});
    }
  })
}

module.exports = userAuth;