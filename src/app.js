const express = require("express");
const connectDB = require("./config/databse");

const app = express();

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(8000, () => {
      console.log("Server is successfully listening on Port 8000 ...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
