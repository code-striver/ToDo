let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function addToDom(task) { 
    const li = document.createElement('li')
    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class = "custom-checkbox">
    <label for="${task.id}"> ${task.text}</label>
    <img src="./Bin.png" class= "delete" data-id="${task.id}" />
  `;
  taskList.append(li);

  
}

function renderList (){
    taskList.innerHTML = ''

    for( let i = 0 ; i< tasks.length ; i++){
        addToDom(tasks[i])
    }

    tasksCounter.innerHTML = tasks.length
}

function toggleTask(taskId) {
    const currentTask = tasks.find(function(task) {
      return task.id === taskId;
    });
    currentTask.done = !currentTask.done;
  }
// function toggleTask (taskId) {
//     const currentTask = tasks.filter(function(task){
//         return task.id === taskId
//     })
//     currentTask.done = !currentTask.done
// }

function deleteTask (taskId) {
    const newTasks = tasks.filter(function(task){
        return task.id != taskId
    })

    tasks = newTasks;
    renderList();
    showNotification('task deleted successfully!!!')
}

function addTask (task) {
    if (task){
        tasks.push(task)
    }
    renderList(); 
    showNotification('task added successfully!!!');
}

function showNotification(t) {
    alert(t);
}

function handleInputKeypress(){
    addTaskInput.addEventListener('keyup', function(e){
        if(e.key === 'Enter'){
            const text = e.target.value;

            if(!text){
                showNotification("Task cannot be empty");
                return;
            }

            const task = {
                text: text,
                id: Date.now().toString() , //Date.now.toString
                done: false
        }
        console.log(task)
        addTask(task);
        }


        
    });
}
handleInputKeypress();
addTaskInput.addEventListener('keyup', function(event){
    if (event.key === "Enter"){
    const text = event.target.value
    console.log(text)
    event.target.value = '';
    }
    
})

function handleClick(event){
    const target = event.target

    if(target.className == 'delete') {
        const taskId = target.dataset.id
        deleteTask(taskId);
        return 
    }
     if (target.className == 'custom-checkbox'){
        const taskId = target.id
        toggleTask(taskId)
        return
    }

}

document.addEventListener('click', handleClick)