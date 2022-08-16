export class TaskList {
    constructor() {}
    taskList = [];
    taskCompleted = [];
    addTask(task) {
        this.taskList = [...this.taskList, task];
    }

    addTaskCompleted(task) {
        this.taskCompleted = [...this.taskCompleted, task];
    }

    removeTask(taskName) {
        this.taskList = this.taskList.filter((task) => task.taskName !== taskName);
    }

    removeTaskCompleted(taskName) {
        this.taskListCompleted = this.taskListCompleted.filter((task) => task.taskName !== taskName);
    }

    findTask(taskName) {
        return this.taskList.find((task) => task.taskName === taskName);
    }
}