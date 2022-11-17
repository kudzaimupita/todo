const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");
const { logger } = require("./middlewares/auth");
const httpStatus = require("http-status");
const config = require("./config/config");
const morgan = require("./config/morgan");

const { authLimiter } = require("./middlewares/rateLimiter");
const { errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");

const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(xss());

app.use(compression());
app.use(logger);
// enable cors
app.use(cors());
app.options("*", cors());
app.use("/user", authLimiter);

require("./routes/user.routes")(app);
require("./routes/todo.routes")(app);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorHandler);

module.exports = app;
