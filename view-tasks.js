document.addEventListener('DOMContentLoaded', () => {
    const taskListElement = document.getElementById('taskList');
    const tasksJSON = localStorage.getItem('tasks');
    const tasks = JSON.parse(tasksJSON) || [];

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <span>${index + 1}: ${task.text} (${task.day}/${task.month}/${task.year})</span>
        `;
        taskListElement.appendChild(taskItem);
    });
});
