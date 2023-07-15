const express = require("express");
const dbConnect = require("./config/db/dbConnet");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user/userRoute");
const { errorHandler, notFound } = require("./middlewares/error/erroHandler");
const app = express();

dotenv.config();

//db connection
dbConnect();

//json paser
app.use(express.json());

//Routes
app.use("/api/users", userRoutes);

//err handler
app.use(notFound); // not found error
app.use(errorHandler);

//PORT
const PORT = process.env.PORT || 4000;
//server
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
