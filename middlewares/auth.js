const jwt = require("jsonwebtoken");
const config = require("../config/config");
const secret = config.jwt.secret;

const logger = (req, res, next) => {
  console.log(`Received: ${req.method} ${req.path} Body: ${req.body}`);
  next();
};

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, data) => {
      if (err) {
        return res.status(403).send({
          message: "Invalid Authorization Token.",
        });
      }
      //   console.log(user);
      req.user = data.user;
      next();
    });
  } else {
    res.status(401).send({
      message: "You must provide Authorization header to use this route.",
    });
  }
};

module.exports = {
  logger: logger,
  auth: authenticateJWT,
};
