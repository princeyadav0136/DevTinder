const validator = require("validator");

const validationSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not Valid");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Enter Strong Password");
  }
};

const validationEditData = (req) => {
  const ALLOWED_UPDATES = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];

  const isUpdateAllowed = Object.keys(req.body).every((key) =>
    ALLOWED_UPDATES.includes(key)
  );

  return isUpdateAllowed;
};

const validationForgotPassword = (req) => {
  const ALLOWED_UPDATES = ["password"];
  const isUpdateAllowed = Object.keys(req.body).every((key) =>
    ALLOWED_UPDATES.includes(key)
  );
  if (!isUpdateAllowed) {
    throw new Error("Invalid Edit Request");
  }
  if (!validator.isStrongPassword(req.body.password)) {
    throw new Error("Enter Strong Password");
  }
};

const validationSendStatus = (req) => {
  const ALLOWED_STATUS = ["interested", "ignored"];
  if (!ALLOWED_STATUS.includes(req.params.status)) {
    throw new Error("Status is not Correct");
  }
};

const validationReceiveStatus = (req) => {
  const ALLOWED_STATUS = ["accepted", "rejected"];
  if (!ALLOWED_STATUS.includes(req.params.status)) {
    throw new Error("Status is not Correct");
  }
};

module.exports = {
  validationSignupData,
  validationEditData,
  validationForgotPassword,
  validationSendStatus,
  validationReceiveStatus,
};
