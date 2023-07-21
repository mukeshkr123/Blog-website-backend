const express = require("express");
const dbConnect = require("./config/db/dbConnect");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user/userRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const categoryRoute = require("./routes/category/categoryRoutes");

const app = express();
dotenv.config();

// Database connection
dbConnect();

// JSON parser
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoute);

// Error handlers
app.use(notFound); // Not found error
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
