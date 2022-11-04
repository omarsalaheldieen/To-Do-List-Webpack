/* eslint-disable eqeqeq */
const input = document.querySelector('.Input')
const taskdiv = document.querySelector('.Tasks')
const taskCompleted = document.querySelector('.Completed-tasks')
const tasksCount = document.querySelector('.tasks-count span')
const tasksCompleted = document.querySelector('.tasks-completed span')
const tasksactive = document.querySelector('.tasks-active span')
let arrayOfTasks
if (localStorage.getItem('Tasks')) {
  arrayOfTasks = JSON.parse(localStorage.getItem('Tasks'))
}
getDataToLocalStorageFrom()
taskCompleted.addEventListener('click', (e) => {
  if (e.target.classList.contains('del')) {
    // Remove Element From Page
    e.target.parentElement.remove()
    // remove it from local storage
    deleteTaskFromlocalStorage(
      e.target.parentElement.getAttribute('Task-name')
    )
    CalculateTasks()
  }
  tasksCompleted.innerHTML = document.querySelectorAll(
    '.Completed-tasks .done'
  ).length
  tasksCount.innerHTML =
    document.querySelectorAll('.Tasks .task').length +
    document.querySelectorAll('.Completed-tasks .done').length
})

taskCompleted.addEventListener('click', (e) => {
  if (e.target.classList.contains('uncomp')) {
    // remove it from local storage
    toggleStatusTaskWith(e.target.parentElement.getAttribute('Task-name'))
    e.target.parentElement.remove()
    if (e.target.parentElement.getAttribute('Task-state')) {
      // Remove Element From Page
      e.target.parentElement.remove()
      // get the datanew from local storage
      getDataToLocalStorageFrom()
    }
  }
})

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
    if (e.target.parentElement.getAttribute('Task-state')) {
      // Remove Element From Page
      e.target.parentElement.remove()
      getDataToLocalStorageFrom()
    }
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
  CalculateTasks()
  tasksCompleted.innerHTML = document.querySelectorAll(
    '.Completed-tasks .done'
  ).length
  tasksCount.innerHTML =
    document.querySelectorAll('.Tasks .task').length +
    document.querySelectorAll('.Completed-tasks .done').length
})

function addElementsToPageFrom (arrayOfTasks) {
  taskdiv.innerHTML = ''
  taskCompleted.innerHTML = ''
  arrayOfTasks.forEach((task) => {
    // check if task is completed or not
    if (task.completed === false) {
      const div = document.createElement('div')
      div.className = 'task'
      if (task.completed) {
        div.className = 'task done'
      }
      div.setAttribute('Task-name', task.id)
      div.setAttribute('Task-state', task.completed)
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
      div.appendChild(span1)
      // Append Button To Main Div
      div.appendChild(completed)
      div.appendChild(span)
      // Add Task Div To Tasks Container
      taskdiv.appendChild(div)
    // eslint-disable-next-line brace-style
    }
    // check if task is completed or not
    else {
      const div = document.createElement('div')
      div.className = 'task'
      if (task.completed) {
        div.className = 'task done'
      }
      div.setAttribute('Task-name', task.id)
      div.setAttribute('Task-state', task.completed)
      div.appendChild(document.createTextNode(task.title))
      // Create Delete Button
      const span = document.createElement('span')
      span.className = 'del'
      span.appendChild(document.createTextNode('Delete'))
      // Add Button Uncomplete
      const spanuncomplete = document.createElement('span')
      spanuncomplete.className = 'uncomp'
      spanuncomplete.appendChild(document.createTextNode('Uncomplete'))
      // Append Button To Main Div
      div.appendChild(spanuncomplete)
      div.appendChild(span)
      // Add Task Div To Tasks Container
      taskCompleted.appendChild(div)
    }
  })
}

// add the data to local storage from array of tasks
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
  tasksCompleted.innerHTML = document.querySelectorAll(
    '.Completed-tasks .done'
  ).length
  tasksCount.innerHTML =
    document.querySelectorAll('.Tasks .task').length +
    document.querySelectorAll('.Completed-tasks .done').length
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

function toggleStatusTaskWith (taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false)
    }
  }
  // then put the new data in local storage
  addDataToLocalStorageFrom(arrayOfTasks)
}
// Function To calculate tasks
function CalculateTasks () {
  // Calculate the Tasks
  tasksCount.innerHTML = document.querySelectorAll('.Tasks .task').length
  // Calculte the finished Tasks
  tasksCompleted.innerHTML = document.querySelectorAll(
    '.Completed-tasks .done'
  ).length
  // calculate the active tasks
  tasksactive.innerHTML =
    (tasksCount.innerHTML = document.querySelectorAll('.Tasks .task').length) -
    (tasksCompleted.innerHTML =
      document.querySelectorAll('.Tasks .done').length)
}
