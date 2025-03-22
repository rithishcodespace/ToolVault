const validator = require("validator");

const validate = (req) =>{
  if(!validator.isEmail(req.body.emailId))
  {
    throw new Error("It is not a valid emailId");
  }
  if(!validator.isStrongPassword(req.body.password))
  {
    throw new Error("It is not a Strong Password");
  }
}

module.exports = validate;