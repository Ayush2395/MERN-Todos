const mongoose = require("mongoose");
const todos = require("../model/todosModel");

/*==========create todos========= */
const createTodo = async (req, res) => {
  const { task, status } = req.body;

  try {
    const user_id = req.user._id;
    const todo = await todos.create({ task, status, user_id });
    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "task not added" });
  }
};

/*===========read todos======== */
const getTodo = async (req, res) => {
  const user_id = req.user._id;
  try {
    const todo = await todos.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ error: "No tasks" });
  }
};

/*===========read single todos========= */
const getOneTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await todos.findById(id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ error: "invalid doc ref" });
  }
};

/*=============update todos=========== */
const updateTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "there is no such task" });
  }

  const todo = await todos.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!todo) return res.status(404).json({ error: "there is no such task" });

  res.status(200).json(todo);
};

/*===========delete todos========= */
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "no such task" });

  const todo = await todos.findOneAndDelete({ id });

  if (!todo) return res.status(404).json({ error: "no such task" });

  res.status(200).json(todo);
};

module.exports = { createTodo, getOneTodo, getTodo, deleteTodo, updateTodo };
