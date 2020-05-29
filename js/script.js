//возможность создать/редактировать/удалить задачу

let addTitle = document.querySelector('.addTitle');
let addText = document.querySelector('.addText');
let addInputLow = document.querySelector('.nameRadioLow');
let addInputMed = document.querySelector('.nameRadioMed');
let addInputHigh = document.querySelector('.nameRadioHigh');
let addButton = document.querySelector('.addButton');
let todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
addButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todoList.addEventListener('click', editCheck);
filterOption.addEventListener('click', filterTodo);
addInputLow.addEventListener('click', changeRadioLow);
addInputMed.addEventListener('click', changeRadioMid);
addInputHigh.addEventListener('click', changeRadioHigh);

//Functions
function addTodo (event){
    //Prevent form from submitting
    event.preventDefault();
    //ToDo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create LI TITLE
    const newTitle = document.createElement('li');
    newTitle.innerText = addTitle.value;
    newTitle.classList.add('todo-item');
    todoDiv.appendChild(newTitle);
    //Create LI TEXT
    const newText = document.createElement('li');
    newText.innerText = addText.value;
    newText.classList.add('todo-item');
    todoDiv.appendChild(newText);
    //Create INPUT RADIO LOW
    const radioLow = document.createElement('li');
    radioLow.innerText = addInputLow.value;
    radioLow.classList.add('todo-item');
    todoDiv.appendChild(radioLow);
    //Create INPUT RADIO MEDIUM
    const radioMed = document.createElement('li');
    radioMed.innerText = addInputMed.value;
    radioMed.classList.add('todo-item');
    todoDiv.appendChild(radioMed);
    //Create INPUT RADIO HIGH
    const radioHigh = document.createElement('li');
    radioHigh.innerText = addInputHigh.value;
    radioHigh.classList.add('todo-item');
    todoDiv.appendChild(radioHigh);
    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(addTitle.value, addText.value);

    //возможность отметить задачу как выполненную (выполненную задачу нельзя редактировать)

    //CHECK COMPLETE BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //CHECK EDIT BUTTON
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);
    //CHECK TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton); 
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    //Clear ToDo INPUT VALUE
    addTitle.value = "";
    addText.value = "";
    addInputLow.value = "";
    addInputMed.value = "";
    addInputHigh.value = "";
}

function deleteCheck(event) {
    const item = event.target;
    //DELETE TODO
    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        })
    }

    //CHECK MARK
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function editCheck(event) {
    
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
                case "completed":
                    if(todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    }else {
                        todo.style.display = "none";
                    }
                break;
               case "uncompleted":
                    if(!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    }else {
                        todo.style.display = "none";
                    }
               break;
        }
    })
}

function changeRadioLow (e) {
    var now = new Date().toLocaleString();
    if(addInputLow.value) {
        addInputMed.value = null;
        addInputHigh.value = null;
        now;
    }
}

function changeRadioMid (e) {

    if(addInputMed.value) {
        addInputLow.value = null;
        addInputHigh.value = null;
    }
}

function changeRadioHigh (e) {

    if(addInputHigh.value) {
        addInputLow.value = null;
        addInputMed.value = null;
    }
}

//сохранение задач (с использованием localStorage или запись в json-файл)

function saveLocalTodos(todo) {
   let todos;
    if(localStorage.getItem("todos") === null) {
      todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
      } else {
          todos = JSON.parse(localStorage.getItem("todos"));
      }
      todos.forEach(function(todo){
        //ToDo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        //Create LI TITLE
        const newTitle = document.createElement('li');
        newTitle.innerText = todo;
        newTitle.classList.add('todo-item');
        todoDiv.appendChild(newTitle);
        //Create LI TEXT
        const newText = document.createElement('li');
        newText.innerText = todo;
        newText.classList.add('todo-item');
        todoDiv.appendChild(newText);
        //Create INPUT RADIO LOW
        const radioLow = document.createElement('li');
        radioLow.innerText = addInputLow.value;
        radioLow.classList.add('todo-item');
        todoDiv.appendChild(radioLow);
        //Create INPUT RADIO MEDIUM
        const radioMed = document.createElement('li');
        radioMed.innerText = addInputMed.value;
        radioMed.classList.add('todo-item');
        todoDiv.appendChild(radioMed);
        //Create INPUT RADIO HIGH
        const radioHigh = document.createElement('li');
        radioHigh.innerText = addInputHigh.value;
        radioHigh.classList.add('todo-item');
        todoDiv.appendChild(radioHigh);
        //CHECK MARK BUTTON
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //CHECK EDIT BUTTON
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
        editButton.classList.add("edit-btn");
        todoDiv.appendChild(editButton);
        //CHECK TRASH BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton); 
        //APPEND TO LIST
        todoList.appendChild(todoDiv);
      })
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
      } else {
          todos = JSON.parse(localStorage.getItem("todos"));
      }
      const todoIndex = todo.children[0].innerText;
      todos.splice(todos.indexOf(todoIndex), 1);
      localStorage.setItem("todos", JSON.stringify(todos));
}



//выбор цветовой темы приложения (переключатель находится в настройках)

let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector('#dark-mode-toggle');

const enableDarkMode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkMode", "enabled");
}

const disableDarkMode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkMode", null);
}

darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "enabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
})