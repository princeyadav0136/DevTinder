const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validationEditData } = require("../utils/validation");

//get profile of user
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const { user } = req;
    console.log(user);
    res.send(user);
  } catch (err) {
    res.status(400).send("error: " + err.message);
  }
});

//edit the profile of user
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validationEditData(req)) {
      throw new Error("Invalid Data Request");
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach(
      (keys) => (loggedInUser[keys] = req.body[keys])
    );
    loggedInUser.save();
    res.json({ message: "User Updated Successfully", data: loggedInUser });
  } catch (err) {
    res.status(400).send("error: " + err.message);
  }
});

module.exports = profileRouter;
