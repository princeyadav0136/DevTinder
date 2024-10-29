const express = require("express");
const authRouter = express.Router();

const { validationSignupData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// signup the user
authRouter.post("/signup", async (req, res) => {
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
authRouter.post("/login", async (req, res) => {
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
      console.log(token);
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

authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("Logout Successfully");
});

module.exports = authRouter;
