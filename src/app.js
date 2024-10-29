const express = require("express");
const connectDB = require("./config/databse");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// //get user by email
// app.get("/user", userAuth, async (req, res) => {
//   try {
//     const userEmail = req.body.email;
//     const users = await User.find({ email: userEmail });
//     if (users.length === 0) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// // feed -api get all user
// app.get("/feed", userAuth, async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// // delete the user
// app.delete("/user", userAuth, async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete(userId); // userId or {_id: userId} both are same in this case
//     res.send("User Deleted Successfully");
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// //update the user
// app.patch("/user/:userId", userAuth, async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;
//   try {
//     const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );
//     if (!isUpdateAllowed) {
//       throw new Error("Update not allowed");
//     }
//     if (data?.skills.length > 10) {
//       throw new Error("Skills should not be greater tha 10");
//     }
//     const user = await User.findByIdAndUpdate(userId, data, {
//       runValidators: true,
//     });
//     res.send("User Updataed Successfully");
//   } catch (err) {
//     res.status(400).send("Update Failed:" + err.message);
//   }
// });

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
