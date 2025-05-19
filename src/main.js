/*
  Створи список справ.
  На сторінці є два інпути які має вводитися назва і текст задачі.
  Після натискання на кнопку "Add" завдання додається до списку #task-list.

  У кожної картки має бути кнопка "Delete", щоб можна було
  прибрати завдання зі списку.
  Список із завданнями має бути доступним після перезавантаження сторінки.

  Розмітка картки задачі
  <li class="task-list-item">
      <button class="task-list-item-btn">Delete</button>
      <h3>Заголовок</h3>
      <p>Текст</p>
  </li>
*/

import * as refs from './js/refs.js';
import {
  saveTasksToLocalStorage,
  loadTasksFromLocalStorage,
  loadThemeFromLocalStorage,
} from './js/local-storage-api.js';
import { v4 as uuidv4 } from 'uuid';
import { createTaskMarkup } from './js/render-tasks.js';
import { onDeleteTask, onChangeTheme, editTask } from './js/tasks.js';

refs.taskFormData.addEventListener('submit', onFormSubmit);

loadTasks();
loadTheme();
refs.taskList.addEventListener('click', onDeleteTask);
refs.btnChangeTheme.addEventListener('click', onChangeTheme);

function onFormSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const { taskName, taskDescription } = form.elements;

  if (!taskName.value.trim() || !taskDescription.value.trim()) {
    iziToast.error({
      title: 'Error',
      message: 'Please fill in all fields',
      position: 'center',
      timeout: 4000,
    });
    return;
  }

  const task = {
    id: uuidv4(),
    title: taskName.value.trim(),
    description: taskDescription.value.trim(),
  };

  const taskMarkup = createTaskMarkup(task);
  refs.taskList.insertAdjacentHTML('beforeend', taskMarkup);
  saveTasksToLocalStorage(task);
  form.reset();
}

function loadTasks() {
  const tasks = loadTasksFromLocalStorage();
  const taskMarkup = tasks.map(createTaskMarkup).join('');
  refs.taskList.insertAdjacentHTML('beforeend', taskMarkup);
}

function loadTheme() {
  const theme = loadThemeFromLocalStorage();
  if (theme === 'theme-light') {
    document.body.classList.replace('theme-dark', 'theme-light');
  }
}

refs.taskList.addEventListener('click', function (e) {
  if (e.target.classList.contains('edit-btn')) {
    editTask(e);
  }
});
