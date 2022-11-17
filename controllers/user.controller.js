const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

const secret = config.jwt.secret;
async function findUserByEmail(email) {
  try {
    users = await User.findAll({ where: { email: email } });
    return users instanceof Array ? users[0] : null;
  } catch (ex) {
    throw ex;
  }
}

exports.signup = catchAsync(async (req, res) => {
  const body = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const user = await User.create(body);

  res.send({
    status: "success",
    user: user,
    token: jwt.sign({ user }, secret),
  });
});

exports.login = catchAsync(async (req, res) => {
  if ((!req.body.username && !req.body.email) || !req.body.password) {
    throw new ApiError(400, "Please provide username/email and password.");
  }
  const user = await findUserByEmail(req.body.email);

  if (user == null || !(user instanceof User)) {
    throw new ApiError(403, "Invalid Credentials!");
  } else {
    if (user.verifyPassword(req.body.password)) {
      res.status(200).send({
        status: "success",
        token: jwt.sign({ user }, secret),
        user: user,
      });
    } else {
      throw new ApiError(403, "Invalid Credentials!");
    }
  }
});
