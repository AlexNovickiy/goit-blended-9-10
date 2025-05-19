export function saveTasksToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function loadTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

export function removeTaskFromLocalStorage(taskId) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

export function saveThemeToLocalStorage(theme) {
  localStorage.setItem('theme', theme);
}

export function loadThemeFromLocalStorage() {
  return localStorage.getItem('theme');
}
