// Selecting the elements

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const editForm = document.getElementById('edit-form');
const editInput = document.getElementById('edit-input');
const cancelEditBtn = document.getElementById('cancel-edit-btn');

let oldInputValue;

// Functions

//Creating all the todo that is going to be appended
const saveTodo = (text) => {
    const todo = document.createElement("div")
    todo.classList.add("todo")

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class=" fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class=" fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class=" fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo);
    todoInput.value = ""
    todoInput.focus();
}

const toggleForms = () =>{
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (editInputValue) => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");
         
        console.log(todoTitle, editInputValue);
        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = editInputValue;
        }
    });
};

// Events

todoForm.addEventListener("submit",(e)=> {
    e.preventDefault();

    const inputValue = todoInput.value;
    if (inputValue){
        saveTodo(inputValue);
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;
    
    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }


    if (targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done");
    }

    if (targetEl.classList.contains("edit-todo")){
        toggleForms();
       


        editInput.value = todoTitle
        oldInputValue = todoTitle // keeping in the memory the old value that  was typed
        


    }

    if (targetEl.classList.contains("remove-todo")){
        parentEl.remove();
    }
});

cancelEditBtn.addEventListener("click", (e)=> {
    e.preventDefault(); //prevent that the button send to a form

    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value

    if(editInputValue){
        updateTodo(editInputValue)
    }
    toggleForms();
});