class TaskCollection {
    constructor() {
        this.tasks = [];
    }

    add(taskName) {
        this.tasks.push({
            'name': taskName,
            'completed': false,
        });
    }

    getIndexByTaskName(taskName) {
        let index = -1;
        const numOfTasks = this.tasks.length;

        for (let i = 0; i < numOfTasks; i++) {
            if (this.tasks[i].name === taskName) {
                index = i;
                break;
            }
        }

        return index;
    }

    remove(taskName) {
        const index = this.getIndexByTaskName(taskName);

        if (index > -1) {
            this.tasks.splice(index, 1);
        }
    }

    toggleCompleted(taskName) {
        const index = this.getIndexByTaskName(taskName);

        if (index > -1) {
            this.tasks[index].completed = !this.tasks[index].completed;
        }
    }

    remaining() {
        return this.tasks.filter(task => !task.completed);
    }

    completed() {
        return this.tasks.filter(task => task.completed);
    }

    remainingTasksCount() {
        return this.remaining().length;
    }
}
