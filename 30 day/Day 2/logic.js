const inputBox = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-todo-btn");
const todoList = document.querySelector("#todo-list");

// Load tasks on page load
window.addEventListener("DOMContentLoaded", load);

// Add task via button click
addBtn.addEventListener("click", function () {
    full_work();
});

// Add task via Enter key
inputBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        full_work();
    }
});

function full_work() {
    const task = inputBox.value.trim();
    if (task === "") {
        alert("Please enter a todo item.");
        return;
    }

    createTodo(task, false);
    inputBox.value = "";
    save();
}

function createTodo(text, completed) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    if (completed) li.classList.add("completed");

    // Check circle
    const checkCircle = document.createElement("span");
    checkCircle.className = "check-circle";
    checkCircle.addEventListener("click", function () {
        li.classList.toggle("completed");
        save();
    });

    // Task text
    const todoText = document.createElement("span");
    todoText.className = "task-text";
    todoText.textContent = text;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.title = "Delete";
    deleteBtn.addEventListener("click", function () {
        li.remove();
        save();
    });

    li.appendChild(checkCircle);
    li.appendChild(todoText);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}

function save() {
    const todos = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
        const text = li.querySelector(".task-text").textContent;
        const completed = li.classList.contains("completed");
        todos.push({ text, completed });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function load() {
    const stored = localStorage.getItem("todos");
    if (!stored) return;

    const todos = JSON.parse(stored);
    todos.forEach(todo => {
        createTodo(todo.text, todo.completed);
    });
}
