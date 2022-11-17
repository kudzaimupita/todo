const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(8080),
    JWT_SECRET: Joi.string()
      .required()
      .description("JWT secret key")
      .required(),
    DB_HOST: Joi.string().description("host name").required(),
    DB_PORT: Joi.number()
      .description("port to connect to the server")
      .required(),
    DB_USER: Joi.string().description("user for db server").required(),
    DB_PASSWORD: Joi.string().description("password for db server").required(),
    DB_DIALECT: Joi.string().description("dialect for db server").required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  postgres: {
    HOST: envVars.DB_HOST,
    USER: envVars.DB_USER,
    PASSWORD: envVars.DB_PASSWORD,
    DB: envVars.DB_NAME,
    DIALECT: envVars.DB_DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
  },
};
