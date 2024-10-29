const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

//send connection request
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + " try to sent the request");
});

module.exports = requestRouter;
