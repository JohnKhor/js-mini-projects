class AppRenderer {
    constructor() {
        this.countSpan = document.getElementById("remaining-tasks-count");
        this.taskInput = document.getElementById("task-input");
        this.remainingList = document.getElementById("remaining-list");
        this.completedList = document.getElementById("completed-list");
    }

    renderCount(count) {
        this.countSpan.textContent = count;
    }

    clearInput() {
        this.taskInput.value = "";
    }

    taskToHtmlStr(task) {
        const checked = (task.completed) ? "checked" : "";

        return "<li class='list-group-item'><p class='d-inline'>" + 
            task.name +
            "</p><div class='form-group float-right mb-0'><input type='checkbox'" +
            checked + 
            ">   <button class='btn btn-danger delete-btn'>Delete</button></div></li>";
    }

    tasksToHtmlStr(tasks) {
        let html = "";

        tasks.forEach(task => {
            html += this.taskToHtmlStr(task);
        });
        
        return html;
    }

    renderTasks(tasks, completed) {
        if (completed) {
            this.completedList.innerHTML = this.tasksToHtmlStr(tasks);
        } else {
            this.remainingList.innerHTML = this.tasksToHtmlStr(tasks);
        }
    }
}
