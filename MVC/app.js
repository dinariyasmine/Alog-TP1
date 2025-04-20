const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas', err));

// Routes
app.use('/', todoRoutes);

// Start server
app.listen(port, () => {
  console.log(`Todo app running on http://localhost:${port}`);
});


// Add to controllers/todoController.js
exports.getEditForm = async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).redirect('/');
      }
      res.render('edit', { todo });
    } catch (error) {
      console.error('Error fetching todo:', error);
      res.status(500).redirect('/');
    }
  };
  
  exports.updateTodo = async (req, res) => {
    try {
      const { task } = req.body;
      await Todo.findByIdAndUpdate(req.params.id, { task });
      res.redirect('/');
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).redirect('/');
    }
  };
  
  // Add to routes/todoRoutes.js
  router.get('/edit/:id', todoController.getEditForm);
  router.post('/update/:id', todoController.updateTodo);
  
  
  