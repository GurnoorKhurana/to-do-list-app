document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const taskMonth = document.getElementById('taskMonth');
    const taskYear = document.getElementById('taskYear');
    const addTaskButton = document.getElementById('saveTaskButton');
    const saveButton = document.getElementById('saveButton');
    const loadFile = document.getElementById('loadFile');
    const viewTasksButton = document.getElementById('viewTasksButton');
    const taskList = [];
    const taskListElement = document.createElement('ul');
    taskListElement.classList.add('task-list');
    document.querySelector('.container').appendChild(taskListElement);

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const day = taskDate.value.trim();
        const month = taskMonth.value.trim();
        const year = taskYear.value.trim();

        if (taskText && day && month && year) {
            const task = { text: taskText, day, month, year };
            taskList.push(task);
            displayTask(task, taskList.length);
            taskInput.value = '';
            taskDate.value = '';
            taskMonth.value = '';
            taskYear.value = '';
        }
    });

    function displayTask(task, index) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <span>${index}: ${task.text} (${task.day}/${task.month}/${task.year})</span>
            <button>Delete</button>
        `;
        taskItem.querySelector('button').addEventListener('click', () => {
            taskListElement.removeChild(taskItem);
        });
        taskListElement.appendChild(taskItem);
    }

    saveButton.addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(taskList)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tasks.json';
        a.click();
        URL.revokeObjectURL(url);
    });

    loadFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const tasks = JSON.parse(e.target.result);
                tasks.forEach((task, index) => {
                    taskList.push(task);
                    displayTask(task, index + 1);
                });
            };
            reader.readAsText(file);
        }
    });

    viewTasksButton.addEventListener('click', () => {
        const tasksJSON = JSON.stringify(taskList);
        localStorage.setItem('tasks', tasksJSON);
        window.open('view-tasks.html');
    });
});
