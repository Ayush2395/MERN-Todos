const {
  getTodo,
  createTodo,
  getOneTodo,
  deleteTodo,
  updateTodo,
} = require("../controller/todosController");
const requireAuth = require("../middleware/requireMiddleware");

const todos = require("express").Router();

todos.use(requireAuth);

todos.get("/", getTodo);
todos.post("/", createTodo);
todos.get("/:id", getOneTodo);
todos.delete("/:id", deleteTodo);
todos.patch("/:id", updateTodo);

module.exports = todos;
