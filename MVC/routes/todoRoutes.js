const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Routes
router.get('/', todoController.getAllTodos);
router.post('/add', todoController.addTodo);
router.post('/toggle/:id', todoController.toggleTodo);
router.post('/delete/:id', todoController.deleteTodo);

module.exports = router;