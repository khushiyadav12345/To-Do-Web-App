let tasks = [];

function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskDateTime = document.getElementById("task-datetime");
  const text = taskInput.value.trim();
  const dateTime = taskDateTime.value;

  if (!text) return alert("Please enter a task");

  tasks.push({ text, dateTime, completed: false });
  taskInput.value = "";
  taskDateTime.value = "";
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <strong>${task.text}</strong><br/>
      <small>${task.dateTime || "No deadline"}</small>
      <div class="task-actions">
        <button onclick="toggleComplete(${index})">${task.completed ? "Undo" : "Complete"}</button>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}

renderTasks();
