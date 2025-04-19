require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 1234;
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/authRoute");
const fetchRoute = require("./Routes/fetchRoute");
const postRoute = require("./Routes/postRoute");
const deleteRoute = require("./Routes/deleteRoute");
const patchRoute = require("./Routes/patchRoute");

const allowedOrigins = ['http://localhost:5173', 'https://yourdomain.com'];

const corsOptions = { // the callback function is provided by cors middleware so we dont need to define it
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true  // this allows backend to receive cookies, etc..
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/",authRoute);
app.use("/",fetchRoute);
app.use("/",postRoute);
app.use("/",deleteRoute);
app.use("/",patchRoute);
app.listen(PORT,()=>console.log(`server successfully running on localhost:${PORT}`));


