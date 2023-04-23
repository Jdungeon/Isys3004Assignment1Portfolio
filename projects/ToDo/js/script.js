// Dom manipulation pattern
/*
Step 1: Grab element from the DOM and assign to a js variable
Step 2: Write a function to handle the event
Step 3: connect the variable and the function via the event listener so that the events triggers the update of the DOM
*/


let newTaskInput = document.getElementById('input-task')
let addTaskButton = document.getElementById('add-task')
let todoListContainer = document.getElementById('todo-list')

let templateElement = document.getElementById("list-item-template")
let template = templateElement.innerHTML;

let showActiveButton = document.getElementById("show-active")
let showAllButton = document.getElementById("show-all")
let showCompletedButton = document.getElementById("show-completed")

function onAddTaskClicked(event) {
    //grab the text entered by the user in the input task text box and add it as a list item to my unordered list(ul)

  let taskName = newTaskInput.value;
  newTaskInput.value = ""

  if (taskName !=""){
    let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);
    todoListContainer.insertAdjacentHTML('afterbegin', taskHTML)

    saveTask(taskName, false)
  }

}
function onTodoListClicked(event)
{
  let targetElement = event.target;

  while (!targetElement.classList.contains("task")){
    targetElement = targetElement.parentElement;
  }
  let checkbox = targetElement.querySelector(".checkbox")
  if (checkbox.checked){
   targetElement.classList.add("completed")
  } else {
    targetElement.classList.remove("completed")
  }
  let taskNameElement = targetElement.querySelector(".task-name")
  let taskName = taskNameElement.innerText
  saveTask(taskName, checkbox.checked)
}


function showActiveTasks(event){
  let tasks = document.getElementsByClassName("task")
  console.log(tasks)

  for (let i=0; i<tasks.length; i++){
    if (tasks[i].classList.contains("completed")){
      tasks[i].style.display = "none"
      
    } else{
      tasks[i].style.display = "block"
    }
  }
}


function showAllTasks(event){
  let tasks = document.getElementsByClassName("task")
  console.log(tasks)
  for (let i=0; i<tasks.length; i++){
     if(tasks[i].classList.contains("completed")){
      tasks[i].style.display = "block"
      
     } else{
     tasks[i].style.display = "block"
  }
}
}

function showCompletedTasks(event){
  let tasks = document.getElementsByClassName("task")
  console.log(tasks)

  for (let i=0; i<tasks.length; i++){
    if (tasks[i].classList.contains("completed")){
      tasks[i].style.display = "block"
      
    } else{
      tasks[i].style.display = "none"
      
    } 
    }
  }

  function saveTask(name, IsCompleted){
    localStorage.setItem(name, IsCompleted)
  }

  function rendertasks(){
    for(let i=0; i<localStorage.length; i++){
      let taskName = localStorage.key(i)
      let isCompleted = localStorage.getItem(taskName) == "true"
      let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);
      if (!isCompleted){
        todoListContainer.insertAdjacentHTML('afterbegin', taskHTML)
      }
    }
  }




addTaskButton.addEventListener('click', onAddTaskClicked)
todoListContainer.addEventListener('click', onTodoListClicked)
showActiveButton.addEventListener('click', showActiveTasks)
showAllButton.addEventListener('click', showAllTasks)
showCompletedButton.addEventListener('click', showCompletedTasks)
rendertasks();
/*
create a list item, set the text for the list item to the taskname
add the lost item to the ul element, todolistcontainer
create checkbox:
modify the code to include checkbox as part of the list item

further modify the code to handle the click event on a check box to strike through the list item 
once a task is completed
*/
