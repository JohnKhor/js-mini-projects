class App {
    constructor() {
        this.taskCollection = new TaskCollection();
        this.appRenderer = new AppRenderer();

        this.taskInput = document.getElementById("task-input");
    }

    run() {
        // Add click event for adding task
        const addBtn = document.getElementById("add-btn");
        addBtn.addEventListener("click", (event) => this.handleClickAddBtn(event));

        // Add keydown event for adding task
        this.taskInput.addEventListener("keydown", (event) => this.handleKeydownInput(event));

        const remainingList = document.getElementById("remaining-list");
        const completedList = document.getElementById("completed-list");

        // Add click event for deleting task
        remainingList.addEventListener("click", (event) => this.handleClickDeleteBtn(event));
        completedList.addEventListener("click", (event) => this.handleClickDeleteBtn(event));

        // Add change event for completing task
        remainingList.addEventListener("change", (event) => this.handleChangeCheckbox(event));
        completedList.addEventListener("change", (event) => this.handleChangeCheckbox(event));
    }

    addTaskHandler(event) {
        const taskName = this.taskInput.value;
        let condition = false;

        if (event.type === "click") {
            condition = taskName;
        } else if (event.type === "keydown") { 
            condition = taskName && (event.code === 'Enter' || event.code === 'NumpadEnter');
        }

        if (condition) {
            this.taskCollection.add(taskName);

            this.appRenderer.renderCount(this.taskCollection.remainingTasksCount());
            this.appRenderer.clearInput();
            this.appRenderer.renderTasks(this.taskCollection.remaining(), false);
        }
    }

    handleClickAddBtn(event) {
        this.addTaskHandler(event);
    }

    handleKeydownInput(event) {
        this.addTaskHandler(event);
    }

    handleClickDeleteBtn(event) {
        const tag = event.target;
        
        if (tag.classList.contains("delete-btn")) {
            const listItem = tag.parentNode.parentNode;
            const taskName = listItem.getElementsByTagName("p")[0].textContent;
            const checkBox = listItem.getElementsByTagName("input")[0];
            
            this.taskCollection.remove(taskName);
        
            if (checkBox.checked) {
                this.appRenderer.renderTasks(this.taskCollection.completed(), true);
            } else {
                this.appRenderer.renderCount(this.taskCollection.remainingTasksCount());
                this.appRenderer.renderTasks(this.taskCollection.remaining(), false);
            }
        }
    }

    handleChangeCheckbox(event) {
        const checkBox = event.target;
        const listItem = checkBox.parentNode.parentNode;
        const taskName = listItem.getElementsByTagName("p")[0].textContent;

        this.taskCollection.toggleCompleted(taskName);

        this.appRenderer.renderCount(this.taskCollection.remainingTasksCount());
        this.appRenderer.renderTasks(this.taskCollection.completed(), true);
        this.appRenderer.renderTasks(this.taskCollection.remaining(), false);
    }
}

new App().run();
