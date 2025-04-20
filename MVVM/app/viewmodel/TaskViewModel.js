// First, import any dependencies
import { TaskRepository } from "../repository/TaskRepository.js"; // Adjust path as needed

// Then declare and export the class
export class TaskViewModel {
  constructor() {
    this.tasks = [];
    this.repository = new TaskRepository(); // Assuming you have this class
    this.onTasksChanged = null;
    
    // Initialize tasks from repository if needed
    this.loadTasks();
  }
  
  // Load tasks method (if needed)
async loadTasks() {
    try {
        this.tasks = await this.repository.getLocalTasks() || [];
        this.render();
    } catch (error) {
        console.error("Failed to load tasks", error);
    }
}

  render() {
    if (this.onTasksChanged) {
      this.onTasksChanged(this.tasks);
    }
  }

  // Add task method (appears to be missing in your snippet)
  addTask(taskText) {
    const newTask = {
      id: Date.now().toString(),
      title: taskText,  // Change from 'text' to 'title'
      isDone: false
    };
    
    this.tasks.push(newTask);
    this.repository.saveLocalTasks(this.tasks);
    this.repository.addRemoteTask(newTask).catch(() =>
      console.warn("Remote add failed")
    );
    this.render();
  }
  

  // Toggle task method from your snippet
  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.isDone = !task.isDone;
      this.repository.saveLocalTasks(this.tasks);
      this.repository.addRemoteTask(task).catch(() =>
        console.warn("Remote update failed")
      );
      this.render();
    }
  }
  
  deleteTask(id) {
    // Remove from local array
    this.tasks = this.tasks.filter(task => task.id !== id);
    
    // Update local storage
    this.repository.saveLocalTasks(this.tasks);
    
    // Delete from remote database
    this.repository.deleteRemoteTask(id).catch(() => 
      console.warn("Remote delete failed")
    );
    
    // Update UI
    this.render();
  }
  
}