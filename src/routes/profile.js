const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

//get profile of user
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const { user } = req;
    console.log(user);
    res.send(user);
  } catch (err) {
    res.status(400).send("error: " + err.message);
  }
});

module.exports = profileRouter;
