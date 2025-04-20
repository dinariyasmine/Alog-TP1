// app/entity/Task.js
export class Task {
    constructor(id, title, isDone = false) {
      this.id = id;
      this.title = title;
      this.isDone = isDone;
    }
  }
  