export function createTaskMarkup({ id, title, description }) {
  return `
    <li class="task-list-item" data-id="${id}">
      <div class="task-list-item-btns">
        <button class="task-list-item-btn edit-btn">Edit</button>
        <button class="task-list-item-btn delete-btn">Delete</button>
      </div>
      <h3>${title}</h3>
      <p>${description}</p>
    </li>
  `;
}
