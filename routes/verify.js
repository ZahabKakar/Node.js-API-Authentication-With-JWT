const jwt = require("jsonwebtoken");

// module.exports

module.exports = function (req, res, next) {
  const token = req.header("token-header");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, "TOKEN_SECRET");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("invalid token");
  }
};
