let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// array to store the tasks 
let arrayOfTasks = [];

// check if there is tasks in local starage
if (localStorage.getItem("tasks")) {
    let tasks = localStorage.getItem("tasks");
    arrayOfTasks = JSON.parse(tasks);
}

getTasksFromLocalStorage();

submit.onclick = function () {

    if (input.value !== "") {
        addTaskToArray(input.value); // add task to array of tasks
        input.value = ""; // empty the input field
        input.focus();
    }

}

tasksDiv.addEventListener("click", (e) => {
    // check if this is the delete button
    if (e.target.classList.contains("delete")) {

        // remove parent element from local storage using it's id
        let id = e.target.parentElement.getAttribute("data-id");
        deleteTask(id);

        // remove parent element from page
        e.target.parentElement.remove();
    }

    // check if this is the task element to update it
    if (e.target.classList.contains("task")) {

        // toggle complete for the task
        let id = e.target.getAttribute("data-id");
        toggleTaskStatus(id);
        // toglle done class
        e.target.classList.toggle("done");

    }
})

function addTaskToArray(taskValue) {
    // task data 
    const task = {
        id: Date.now(),
        title: taskValue,
        completed: false,
    };
    // push task to array of tasks
    arrayOfTasks.push(task);
    // add tasks to page
    addTasksToPage(arrayOfTasks);
    // add array of tasks to lacal storage 
    addTasksToLocalStorage(arrayOfTasks);

}

function addTasksToPage(arrayOfTasks) {
    // first we should empty the tasksDiv 
    tasksDiv.innerHTML = "";
    // looping on array of tasks
    arrayOfTasks.forEach((task) => {
        // create div which cotains the task
        let div = document.createElement("div")
        div.className = "task";
        div.setAttribute("data-id", task.id);
        let title = document.createTextNode(task.title)
        div.appendChild(title);

        // check if task is done
        if (task.completed) {
            div.className = "task done";
        }
        // create delete button
        let span = document.createElement("span");
        span.className = "delete";
        span.appendChild(document.createTextNode("Delete"))
        div.appendChild(span);

        // add task div to tasks div 
        tasksDiv.appendChild(div);
    })
}

function addTasksToLocalStorage(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks)); // conver data from js opject to string

}

function getTasksFromLocalStorage() {
    let tasks = window.localStorage.getItem("tasks");
    if (tasks) {
        tasks = JSON.parse(tasks); // convert data from strgin to js opject

        addTasksToPage(tasks);
    }
}


function deleteTask(id) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != id);

    addTasksToLocalStorage(arrayOfTasks);
}

function toggleTaskStatus(id) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (id == arrayOfTasks[i].id) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
    }

    addTasksToLocalStorage(arrayOfTasks);
}
