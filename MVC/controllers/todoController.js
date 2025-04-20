const Todo = require('../models/Todo');

// Display all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.render('index', { todos });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).render('index', { 
      todos: [],
      error: 'Failed to load todos'
    });
  }
};

// Add a new todo
exports.addTodo = async (req, res) => {
  try {
    const { task } = req.body;
    await Todo.create({ task });
    res.redirect('/');
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).redirect('/');
  }
};

// Toggle todo status
exports.toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).redirect('/');
    }
    
    todo.done = !todo.done;
    await todo.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error toggling todo:', error);
    res.status(500).redirect('/');
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).redirect('/');
  }
};

