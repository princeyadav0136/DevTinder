const express = require("express");
const connectDB = require("./config/databse");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Read the data
  console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Bad Data");
  }
});

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
