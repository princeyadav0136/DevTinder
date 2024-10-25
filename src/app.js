const express = require("express");
const connectDB = require("./config/databse");
const User = require("./models/user");

const app = express();

app.use(express.json());

// signup the user
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

//get user by email
app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// feed -api get all user
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// delete the user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId); // userId or {_id: userId} both are same in this case
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
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
