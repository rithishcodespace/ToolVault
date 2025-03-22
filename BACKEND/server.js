require("dotenv");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 1234;
const db = require("./database");
const authRoute = require("./Routes/authRoute");
const fetchRoute = require("./Routes/fetchRoute");
const postRoute = require("./Routes/postRoute");
const deleteRoute = require("./Routes/deleteRoute");
const patchRoute = require("./Routes/patchRoute");

app.use(express.json())
app.use(cors());
app.use("/",authRoute);
app.use("/",fetchRoute);
app.use("/",postRoute);
app.use("/",deleteRoute);
app.use("/",patchRoute);
app.listen(PORT,()=>console.log(`server successfully running on localhost:${PORT}`));


