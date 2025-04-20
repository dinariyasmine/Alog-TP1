import { Task } from "../entity/Task.js";

const API_URL = "http://localhost:3000/api/tasks"; 

export class TaskRepository {
  // LOCAL STORAGE
  getLocalTasks() {
    try {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      return tasks.map(t => new Task(t.id, t.title, t.isDone));
    } catch (error) {
      console.error("Error getting local tasks:", error);
      return [];
    }
  }

  saveLocalTasks(tasks) {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving local tasks:", error);
    }
  }

  // DISTANT (MongoDB Atlas via API)
  async getRemoteTasks() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error(`Failed to fetch tasks: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      return data.map(t => new Task(t._id, t.title, t.isDone));
    } catch (error) {
      console.error("Error fetching remote tasks:", error);
      return [];
    }
  }

  async addRemoteTask(task) {
    try {
      // Ensure task has a title property before sending
      if (!task.title) {
        console.error("Task is missing required title field");
        return null;
      }
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: task.title,
          isDone: task.isDone || false
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to add task: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error adding remote task:", error);
      return null;
    }
  }
  
  // You might want to add methods for updating and deleting tasks
  async updateRemoteTask(task) {
    try {
      if (!task._id) {
        console.error("Task is missing _id field");
        return null;
      }
      
      const response = await fetch(`${API_URL}/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: task.title,
          isDone: task.isDone
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update task: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error updating remote task:", error);
      return null;
    }
  }
  async deleteRemoteTask(taskId) {
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete task: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error deleting remote task:", error);
      return null;
    }
  }
  
}
