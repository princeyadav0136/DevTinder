const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;

    if (!token) {
      throw new Error("Invalid Token");
    }

    const decodedMessage = await jwt.verify(token, "SceretKeyNamasteNode");
    const { _id } = decodedMessage;

    const user = await User.findById(_id);
    
    if (!user) {
      throw new Error("User does not exist");
    }

    //attaching user to auth user
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("error: " + err.message);
  }
};

module.exports = {
  userAuth,
};
