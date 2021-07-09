const inputTask = document.querySelector('.task')
const containerList = document.querySelector('.todo-list')
const todo = document.querySelector('.todo-list ul')

inputTask.addEventListener('keyup', (e)=>{
   let key = e.which || e.keycode

   if(key == 13){
      newTask(inputTask.value)
      clearInput()
      saveTask()
   }
})


function newTask(task, completed = false){
   const li = document.createElement('li')
   const span = document.createElement('span')
   span.innerText = task
   li.appendChild(span)
   todo.appendChild(li)

   if(completed){
      li.classList.add('completed')
   }

   li.addEventListener('click', ()=>{
      li.classList.toggle('completed')
      saveTask()
   })

   li.innerHTML += `<img class="btnDelete" src="./assets/minus.svg" alt="" />`

   document.addEventListener('click', (e)=>{
      el = e.target
      if(el.classList.contains('btnDelete')){
         el.parentElement.remove()
         saveTask()
      }
   })
}

function saveTask(){
   const tasks = todo.querySelectorAll('li')
   const listTasks = []

   tasks.forEach( task =>{
      listTasks.push({
         text: task.innerText,
         completed: task.classList.contains('completed')
      })
   })

   localStorage.setItem('tasks', JSON.stringify(listTasks))
}

function recoverTasks(){
   const tasks = localStorage.getItem('tasks')
   const listTasks = JSON.parse(tasks)

   for(let task of listTasks){
      newTask(task.text, task.completed)
   }
}

function clearInput(){
   inputTask.value = ""
   inputTask.focus()
}

recoverTasks()