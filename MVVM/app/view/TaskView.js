export class TaskView {
    constructor(viewModel) {
      this.viewModel = viewModel;
  
      // Bind DOM elements
      this.taskInput = document.getElementById("taskInput");
      this.addTaskBtn = document.getElementById("addTaskBtn");
      this.taskList = document.getElementById("taskList");
  
      // Bind actions
      this.addTaskBtn.addEventListener("click", () => this.handleAddTask());
    }
    
    initialize() {
      this.viewModel.onTasksChanged = tasks => this.renderTasks(tasks);
      // Change this line - loadTasks instead of init
      this.viewModel.loadTasks();
    }
  
    handleAddTask() {
      const title = this.taskInput.value.trim();
      if (title) {
        this.viewModel.addTask(title);
        this.taskInput.value = "";
      }
    }
    renderTasks(tasks) {
        this.taskList.innerHTML = "";
        tasks.forEach(task => {
          const li = document.createElement("li");
          li.className = `p-2 rounded cursor-pointer flex justify-between items-center ${
            task.isDone ? "line-through bg-green-200" : "bg-white"
          }`;
          
          // Task text
          const textSpan = document.createElement("span");
          textSpan.textContent = task.title;
          textSpan.addEventListener("click", () => {
            this.viewModel.toggleTask(task.id);
          });
          
          // Delete button
          const deleteBtn = document.createElement("button");
          deleteBtn.innerHTML = "×";
          deleteBtn.className = "text-red-500 font-bold text-xl hover:text-red-700";
          deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent toggling the task
            this.handleDeleteTask(task.id);
          });
          
          li.appendChild(textSpan);
          li.appendChild(deleteBtn);
          this.taskList.appendChild(li);
        });
      }
      
      handleDeleteTask(id) {
        if (confirm("Are you sure you want to delete this task?")) {
          this.viewModel.deleteTask(id);
        }
      }
      

handleDeleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    this.viewModel.deleteTask(id);
  }
}

      
}