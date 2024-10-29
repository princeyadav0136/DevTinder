const express = require("express");
const connectDB = require("./config/databse");
const User = require("./models/user");
const validationSignupData = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

// signup the user
app.post("/signup", async (req, res) => {
  // Read the data
  try {
    console.log(req.body);
    const { firstName, lastName, email, password } = req.body;

    //validation of data
    validationSignupData(req);

    //encrypting password;

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("error: " + err.message);
  }
});

//login api
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //create token
      const token = await user.getJWT();
      console.log(token)
      //add token to cookie
      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 3600000),
      });
      res.send("Login Successfull!!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("error: " + err.message);
  }
});

//get profile of user
app.get("/profile", userAuth, async (req, res) => {
  try {
    const { user } = req;
    console.log(user);
    res.send(user);
  } catch (err) {
    res.status(400).send("error: " + err.message);
  }
});

//send connection request
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + " try to sent the request");
});

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
