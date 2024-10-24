const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.get("/getUserData", (req, res) => {
  
  try {
    throw new Error("dvdddkflf");
  res.send("User Data Sent");
  }
  catch(err) {
    res.status(500).send("Some error occured");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});

app.listen(8000, () => {
  console.log("Server is successfully listening on Port 8000 ...");
});
