
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function displayTodos() {
    list.innerHTML = "";

    const filteredTodos = todos.filter(todo => {
        if (currentFilter === "active") {
            return !todo.completed;
        }

        if (currentFilter === "completed") {
            return todo.completed;
        }

        return true;
    });

    filteredTodos.forEach(todo => {
        const li = document.createElement("li");

        const task = document.createElement("span");
        task.textContent = todo.text;

        if (todo.completed) {
            task.classList.add("completed");
        }

        task.addEventListener("click", () => {
            todo.completed = !todo.completed;
            saveTodos();
            displayTodos();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");

        deleteButton.addEventListener("click", () => {
            todos = todos.filter(item => item.id !== todo.id);
            saveTodos();
            displayTodos();
        });

        li.appendChild(task);
        li.appendChild(deleteButton);
        list.appendChild(li);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskText = input.value.trim();

    if (taskText === "") {
        return;
    }

    todos.push({
        id: Date.now(),
        text: taskText,
        completed: false
    });

    input.value = "";

    saveTodos();
    displayTodos();
});

document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        displayTodos();
    });
});

document.getElementById("clear-completed")
    .addEventListener("click", () => {
        todos = todos.filter(todo => !todo.completed);
        saveTodos();
        displayTodos();
    });

displayTodos();
