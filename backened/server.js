const express = require("express");
const dbConnect = require("./config/db/dbConnet");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

//db connection
dbConnect();

//PORT
const PORT = process.env.PORT || 4000;
//server
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
