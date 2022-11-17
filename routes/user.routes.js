module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  const validate = require("../middlewares/validate");
  const authValidation = require("../validations/user.validation");

  var router = require("express").Router();

  router.post("/signup", validate(authValidation.signup), users.signup);

  router.post("/login", users.login);

  app.use("/user", router);
};
