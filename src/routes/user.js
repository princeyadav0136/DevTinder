const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequests");
const User = require("../models/user");

const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate(
      "fromUserId",
      "firstName lastName skills age gender about photoUrl"
    );
    res.json({
      message: "Requests fetched Successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate(
        "fromUserId",
        "firstName lastName skills age gender about photoUrl"
      )
      .populate(
        "toUserId",
        "firstName lastName skills age gender about photoUrl"
      );

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({
      message: "Requests fetched Successfully",
      data,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    // user should see all the user cards expect
    // 0. his own card
    // 1. his connections
    // 2. ignored people
    // 3. already sent the connection request

    const loggedInUser = req.user;

    //Find all the connection Request
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        {
          toUserId: loggedInUser._id,
        },
        {
          fromUserId: loggedInUser._id,
        },
      ],
    }).select("fromUserId toUserId");

    const hideUserfromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUserfromFeed.add(req.fromUserId);
      hideUserfromFeed.add(req.toUserId);
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserfromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select("firstName lastName skills age gender about photoUrl");

    res.json({ message: "Users Fetched Successfully !!!", data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
