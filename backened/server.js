const express = require("express");
const app = express();

//PORT
const PORT = process.env.PORT || 4000;

//server
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
