const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const {
  validationSendStatus,
  validationReceiveStatus,
} = require("../utils/validation");
const User = require("../models/user");
const connectionRequests = require("../models/connectionRequests");

//send connection request
requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;
      // validate Data
      validationSendStatus(req);

      const toUser = await User.findById(toUserId);

      if (!toUser) {
        throw new Error("User not found!!!");
      }

      const existingConnection = await connectionRequests.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnection) {
        throw new Error("Connection ALready Exists!!");
      }
      const connection = new connectionRequests({
        fromUserId,
        toUserId,
        status,
      });
      await connection.save();
      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

//receive connection request
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const loggedInUser = req.user;
      validationReceiveStatus(req);
      const connectionRequest = await connectionRequests.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        throw new Error("Request not found");
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({
        message: "connection Request " + status,
        data,
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

module.exports = requestRouter;
