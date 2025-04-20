const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// POST new task
router.post("/", async (req, res) => {
    try {
      // Validate that title exists
      if (!req.body.title) {
        return res.status(400).json({ error: "Title is required" });
      }
      
      const task = new Task({
        title: req.body.title,
        isDone: req.body.isDone || false
      });
      
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(400).json({ error: error.message });
    }
  });
  
  

// Optional: Update task
router.put("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// DELETE task

router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Check if ID is valid ObjectId
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ 
          error: "Invalid ID format. Must be a valid MongoDB ObjectId." 
        });
      }
      
      const task = await Task.findByIdAndDelete(id);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
