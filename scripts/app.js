const createModal = document.querySelector('.create-task-modal')
const createButton = document.querySelector('.create-new-task-button2')
const deleteAll = document.querySelector('.create-new-task-button1')

const soundClick = document.querySelector('#mouse-click')
soundClick.volume = 0.3

const formId = document.querySelector('#taskForm')
const tasksSection = document.querySelector('.tasks-section')
const numTask = tasksSection.querySelectorAll('.created-task')

let binButton = document.querySelectorAll('.one-task-delete')

let taskArr = []

createButton.addEventListener('click', () => {
    soundClick.currentTime = 0
    soundClick.play()
    createModal.classList.toggle('d-block')
})

document.addEventListener('keydown', (event) => {
    if(event.key == 'Escape'){
        createModal.classList.remove('d-block')
    }
})
formId.addEventListener('submit', (event) => {
    event.preventDefault()

    let formData = new FormData(event.target)
    let newTask = formData.get('newTask')
    if(!(newTask == "")){
        let newTaskObj = {text: newTask, count: taskArr.length + 1}
        taskArr.push(newTaskObj)
        createTask()
    }
    event.target.reset()
    createModal.classList.remove('d-block')
})

deleteAll.addEventListener('click', () => {
    soundClick.currentTime = 0
    soundClick.play()
    tasksSection.innerHTML = ""
    taskCounter = 0
    taskArr = []
})

tasksSection.addEventListener('click', function (e) {
    if (
      e.target.classList.contains('one-task-delete') ||
      e.target.closest('.one-task-delete')
    ) {
        const task = e.target.closest('.created-task');
        const allTasks = Array.from(document.querySelectorAll('.created-task'));
        const index = allTasks.indexOf(task);   
        console.log(`This was card number ${index + 1}`); 
        taskArr.splice(index, 1)
        console.log(taskArr)
        if (task) task.remove();
        reCalibrateCount()
    }
  });


function reCalibrateCount(){
    itteration = taskArr.length
    for(let i = 0; i < itteration; i++){
        taskArr[i].count = i+1
    }
    createTask()
}

function createTask() {
    tasksSection.innerHTML = ""
    taskArr.forEach(element => {
        tasksSection.insertAdjacentHTML("beforeend", `
            <div class="created-task col-12 col-sm-6 col-md-4 d-flex align-items-center position-relative">
            <label class="checkbox-label me-2">
              <input type="checkbox" id="myCheckbox">
              <span class="custom-checkbox"></span>
            </label>
            <p class="m-0">${element.count}. ${element.text}</p>
            <div class="one-task-delete position-absolute">
              <img src="./images/bin.png" alt="">
            </div>
          </div>`)
    })
}