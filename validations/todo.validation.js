const Joi = require("joi");

const createTodo = {
  body: Joi.object().keys({
    description: Joi.string().required(),
  }),
};

const markTodoCompleted = {
  params: Joi.object().keys({
    id: Joi.number(),
  }),
};

const markTodoUncompleted = {
  params: Joi.object().keys({
    id: Joi.number(),
  }),
};

const deleteTodo = {
  params: Joi.object().keys({
    id: Joi.number(),
  }),
};

module.exports = {
  createTodo,
  markTodoCompleted,
  markTodoUncompleted,
  deleteTodo,
};
