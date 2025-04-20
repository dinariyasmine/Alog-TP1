import { TaskViewModel } from "./viewmodel/taskViewModel.js";
import { TaskView } from "./view/TaskView.js";

document.addEventListener("DOMContentLoaded", () => {
  const viewModel = new TaskViewModel();
  const view = new TaskView(viewModel);
  view.initialize();
});