const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthorized = token === "xyz";
  isAuthorized ? next() : res.status(401).send("Unauthorized Request");
};

module.exports = {
  adminAuth,
};
