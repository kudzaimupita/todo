const db = require("../models");
const Todo = db.tasks;
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

exports.createTodo = catchAsync(async (req, res) => {
  const newTodo = {
    description: req.body.description,
    user: req.user.id,
    completed: false,
  };

  await Todo.create(newTodo);

  res.status(200).send({
    status: "success",
  });
});

exports.listTodos = catchAsync(async (req, res) => {
  const todos = await Todo.findAll({ where: { user: req.user.id,},order: [['updatedAt', 'DESC']] });

  res.status(200).send({ status: "success", todos });
});

exports.markTodoCompleted = catchAsync(async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findByPk(id);

  if (!todo) throw new ApiError(404, "Todo not found");
  if (todo?.user && todo?.user !== req.user.id)
    throw new ApiError(403, "Unauthorized");

  await Todo.update(
    { completed: true },
    {
      where: { id: id },
    }
  );

  res.status(200).send({ status: "success" });
});

exports.markTodoUncompleted = catchAsync(async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findByPk(id);

  if (!todo) throw new ApiError(404, "Todo not found");
  if (todo?.user && todo?.user !== req.user.id)
    throw new ApiError(403, "Unauthorized");

  await Todo.update(
    { completed: false },
    {
      where: { id: id },
    }
  );

  res.status(200).send({ status: "success" });
});

exports.deleteTodo = catchAsync(async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findByPk(id);

  if (!todo) throw new ApiError(404, "Todo not found");

  if (todo?.user && todo?.user !== req.user.id)
    throw new ApiError(403, "Unauthorized");

  await Todo.destroy({
    where: { id: id },
  });

  res.status(200).send({ status: "success" });
});

module.exports = exports;
