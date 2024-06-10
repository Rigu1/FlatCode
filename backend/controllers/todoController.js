const Todo = require('../models/Todo');

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.session.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

const addTodo = async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  try {
    const newTodo = new Todo({
      userId: req.session.user.id,
      text
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    if (todo.userId.toString() !== req.session.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    todo.text = text || todo.text;
    todo.completed = completed !== undefined ? completed : todo.completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    if (todo.userId.toString() !== req.session.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    await todo.remove();
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo
};