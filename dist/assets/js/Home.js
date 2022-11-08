/* eslint-disable eqeqeq */
const input = document.querySelector('.Input')
const submit = document.querySelector('.Add')
const taskdiv = document.querySelector('.Tasks')
const tasksCount = document.querySelector('.tasks-count span')
const tasksCompleted = document.querySelector('.tasks-completed span')
const tasksactive = document.querySelector('.tasks-active span')
const daaa = window.localStorage.getItem('state')

async function funcName (url) {
  const response = await fetch(url)
  const data = await response.json()
  const { content } = data
  document.querySelector('.Container-Section-b').textContent = content
}
if (daaa === '1') {
  funcName('https://api.quotable.io/random?tags=history|civil-rights')
}

// Empty Array To Store The Tasks
let arrayOfTasks = []

// Check if the Local storage has the Tasks
if (localStorage.getItem('Tasks')) {
  arrayOfTasks = JSON.parse(localStorage.getItem('Tasks'))
}
getDataToLocalStorageFrom()

submit.onclick = function () {
  if (input.value !== '') {
    addTaskToArray(input.value) // Add Task To Array Of Tasks
    CalculateTasks()
    input.value = '' // Empty Input Field
  }
}

taskdiv.addEventListener('click', (e) => {
  // Delete Button
  if (e.target.classList.contains('del')) {
    // Remove Element From Page
    e.target.parentElement.remove()
    // remove it from local storage
    deleteTaskFromlocalStorage(
      e.target.parentElement.getAttribute('Task-name')
    )
    CalculateTasks()
  }
  if (e.target.classList.contains('comp')) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.parentElement.getAttribute('Task-name'))
    // Toggle Done Class\
    e.target.classList.toggle('done')
  }
  CalculateTasks()
  // Update the Tasks
  if (e.target.classList.contains('Upd')) {
    if (input.value !== '') {
      Updatethetask(e.target.parentElement.getAttribute('Task-name')) // Add Task To Array Of Tasks
      input.value = '' // Empty Input Field
    }
    getDataToLocalStorageFrom()
  }
})

// function addTextbox(event) {
//   var input = document.createElement("input");
//   input.setAttribute("type", "text");
//   document.querySelector(".task").appendChild(input);
// }

function addTaskToArray (taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false
  }
  arrayOfTasks.push(task)
  //  Add Tasks to page
  addElementsToPageFrom(arrayOfTasks)
  // Add task to local Storage
  addDataToLocalStorageFrom(arrayOfTasks)
}

function addElementsToPageFrom (arrayOfTasks) {
  taskdiv.innerHTML = ''
  arrayOfTasks.forEach((task) => {
    const div = document.createElement('div')
    div.className = 'task'
    if (task.completed) {
      div.className = 'task done'
    }
    div.setAttribute('Task-name', task.id)
    div.setAttribute('Task-update-name', task.title)
    div.appendChild(document.createTextNode(task.title))
    // create complete button
    const completed = document.createElement('span')
    completed.className = 'comp'
    completed.appendChild(document.createTextNode('Completed'))
    // Create Delete Button
    const span = document.createElement('span')
    span.className = 'del'
    span.appendChild(document.createTextNode('Delete'))
    // Create Update Button
    const span1 = document.createElement('span')
    span1.className = 'Upd'
    span1.appendChild(document.createTextNode('Update'))
    // Append Button To Main Div
    div.appendChild(completed)
    div.appendChild(span1)
    div.appendChild(span)
    // Add Task Div To Tasks Container
    taskdiv.appendChild(div)
    console.log(div)
  })
}

// Store the Data in the Local Storage
function addDataToLocalStorageFrom (arrayOfTasks) {
  window.localStorage.setItem('Tasks', JSON.stringify(arrayOfTasks))
}

// Get the data from local storgage
function getDataToLocalStorageFrom () {
  const Data = window.localStorage.getItem('Tasks')
  if (Data) {
    const tasks = JSON.parse(Data)
    addElementsToPageFrom(tasks)
  }
  CalculateTasks()
}

// Delete the Task from the local storage
function deleteTaskFromlocalStorage (taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id !== taskId)
  // then put the new data in local storage
  addDataToLocalStorageFrom(arrayOfTasks)
}

// Update the task from the local storage
function Updatethetask (taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].title = input.value
    }
  }
  // then put the new data in local storage
  addDataToLocalStorageFrom(arrayOfTasks)
}

// Change the state of completed the Task from the local storage
function toggleStatusTaskWith (taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false)
    }
  } // then put the new data in local storage
  addDataToLocalStorageFrom(arrayOfTasks)
}
// Function To calculate tasks
function CalculateTasks () {
  // Calculate the Tasks
  tasksCount.innerHTML = document.querySelectorAll('.Tasks .task').length
  // Calculte the finished Tasks
  tasksCompleted.innerHTML = document.querySelectorAll('.Tasks .done').length
  // calculate the active tasks
  tasksactive.innerHTML =
    (tasksCount.innerHTML = document.querySelectorAll('.Tasks .task').length) -
    (tasksCompleted.innerHTML =
      document.querySelectorAll('.Tasks .done').length)
}
