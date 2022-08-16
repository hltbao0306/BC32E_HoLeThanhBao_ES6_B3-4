import { Task } from '../models/task.js';
import { TaskList } from '../models/taskList.js';

const getElement = (id) => document.getElementById(id);
const taskService = new TaskList();

const renderTaskList = () => {
    const task = new Task();
    const content = taskService.taskList.reduce((value, task) => {
        return (value += `
        <li class="d-flex justify-content-between">
        <div>
            ${task.taskName}
        </div>
        <div class="task-icon">
            <i class="far fa-trash-alt" onclick="removeTask('${task.taskName}')"></i>
            <i class="fas fa-check-circle" id="checked" onclick="completedTask('${task.taskName}')"></i>
        </div>
        </li>`);
    }, '');
    getElement('todo').innerHTML = content;
}

const renderTaskCompleted = () => {
    const task = new Task();
    const content = taskService.taskList.reduce((value, task) => {
        return (value += `
        <li class="d-flex justify-content-between">
        <div>
            ${task.taskName}
        </div>
        <div class="task-icon">
            <i class="far fa-trash-alt" onclick="removeTaskCompleted('${task.taskName}')"></i>
            <i class="fas fa-check-circle" id="checked" style="color:green"></i>
        </div>
        </li>`);
    }, '');
    getElement('completed').innerHTML = content;
}

const setLocalStore = () => {
    localStorage.setItem('taskList', JSON.stringify(taskService.taskList));
}

const getLocalStore = () => {
    const data = localStorage.getItem('foodList')
    const dataParse = JSON.parse(data)
    taskService.taskList = dataParse.map(value => {
        const task = new Task()
        for(let key in value){
            food[key] = value[key]
        }
        return task
    })
    renderTaskList()
}

getElement("addItem").onclick = () => {
    const input = getElement("newTask").value;
    const task = new Task();
    task.taskName = input;
    taskService.addTask(task);
    renderTaskList();
    setLocalStore();
    getElement("newTask").value = '';
}
  
window.removeTask = (taskName) => {
    taskService.removeTask(taskName);
    renderTaskList();
}

window.completedTask = (val) => {
    const task = new Task();
    task.taskName = val;
    taskService.addTaskCompleted(task);
    removeTask(val);
    renderTaskCompleted();
    console.log("taskService: ", taskService);
}
  
window.removeTaskCompleted = (taskName) => {
    taskService.removeTaskCompleted(taskName);
    renderTaskCompleted();
}
  
getElement("two").onclick = () => {
    const sortList = taskService.taskList.sort((val, nextval) => {
        return val.taskName > nextval.taskName ? 1 : -1;
    });
    renderTaskList();
  
    const sortCompleted = taskService.taskCompleted.sort((val, nextval) => {
        return val.taskName > nextval.taskName ? 1 : -1;
    });
    renderTaskCompleted();
}
  
getElement("three").onclick = () => {
    const sortList2 = taskService.taskList.sort((val, nextval) => {
        return val.taskName < nextval.taskName ? 1 : -1;
    });
    renderTaskList();
  
    const sortCompleted2 = taskService.taskCompleted.sort((val, nextval) => {
        return val.taskName < nextval.taskName ? 1 : -1;
    });
    renderTaskCompleted();
}