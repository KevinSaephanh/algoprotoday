const jwt = require("jsonwebtoken");
const config = require("../../config");

const auth = (req, res) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access denied!");
  }

  try {
    const verified = jwt.verify(token, config.myprivatekey);
    req.user = verified;
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};

const verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];

  //Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    req.token = bearerToken;
    return next();
  } else {
    return res.status(403).send("Access denied!");
  }
};
