const { _, auth } = require("../middlewares/auth");
const tasks = require("../controllers/todo.controller.js");
const validate = require("../middlewares/validate");
const todoValidation = require("../validations/todo.validation");

module.exports = (app) => {
  var router = require("express").Router();

  router.post("/", auth, validate(todoValidation.createTodo), tasks.createTodo);
  router.get("/", auth, tasks.listTodos);
  router.delete(
    "/:id",
    validate(todoValidation.deleteTodo),
    auth,
    tasks.deleteTodo
  );

  router.patch(
    "/complete-task/:id",
    validate(todoValidation.markTodoCompleted),
    auth,
    tasks.markTodoCompleted
  );
  router.patch(
    "/uncomplete-task/:id",
    auth,
    validate(todoValidation.markTodoUncompleted),
    tasks.markTodoUncompleted
  );

  app.use("/tasks", router);
};
