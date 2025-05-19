import {
  removeTaskFromLocalStorage,
  saveTasksToLocalStorage,
  saveThemeToLocalStorage,
} from './local-storage-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export function onDeleteTask(e) {
  if (!e.target.classList.contains('delete-btn')) {
    return;
  }

  const taskItem = e.target.closest('.task-list-item');
  const taskId = taskItem.dataset.id;

  taskItem.remove();
  removeTaskFromLocalStorage(taskId);
}

export function onChangeTheme() {
  const isDarkTheme = document.body.classList.contains('theme-dark');
  document.body.style.transition = 'background-color 0.3s ease-in-out';

  if (isDarkTheme) {
    document.body.classList.replace('theme-dark', 'theme-light');
    saveThemeToLocalStorage('theme-light');
    iziToast.info({
      title: 'Theme changed',
      message: 'Light theme activated',
      position: 'center',
      timeout: 4000,
    });
  } else {
    document.body.classList.replace('theme-light', 'theme-dark');
    saveThemeToLocalStorage('theme-dark');
    iziToast.info({
      title: 'Theme changed',
      message: 'Dark theme activated',
      position: 'center',
      timeout: 4000,
    });
  }
}

export function editTask(e) {
  const taskItem = e.target.closest('.task-list-item');
  const taskId = taskItem.dataset.id;
  const taskTitle = taskItem.querySelector('h3').textContent;
  const taskDescription = taskItem.querySelector('p').textContent;

  const instance = basicLightbox.create(`
  <div class="modal modal-editor">
    <h2 class="modal-editor__title">Edit Task</h2>
    <input 
      type="text" 
      value="${taskTitle}" 
      id="edit-title" 
      class="modal-editor__input"
    />
    <textarea 
      id="edit-description" 
      class="modal-editor__textarea"
    >${taskDescription}</textarea>
    <div class="modal-editor__btns">
      <button id="save-changes" class="modal-editor__btn modal-editor__btn--save">Save Changes</button>
      <button id="quit" class="modal-editor__btn modal-editor__btn--quit">Quit</button>
    </div>
  </div>
`);

  instance.show();

  document.getElementById('save-changes').addEventListener('click', () => {
    const newTitle = document.getElementById('edit-title').value.trim();
    const newDescription = document
      .getElementById('edit-description')
      .value.trim();

    const updatedTask = {
      id: taskId,
      title: newTitle,
      description: newDescription,
    };

    taskItem.querySelector('h3').textContent = newTitle;
    taskItem.querySelector('p').textContent = newDescription;
    saveTasksToLocalStorage(updatedTask);
    instance.close();
  });

  document.getElementById('quit').addEventListener('click', () => {
    instance.close();
  });
}
