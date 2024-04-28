import Task from './Task';

import TaskTag from '../enums/TaskTag';
import TaskStatus from '../enums/TaskStatus';

export default class TaskNegozio extends Task {

    constructor(name: String, description: String,
                taskStatus: TaskStatus, taskid: Number) {

        super(name, description, 'Negozio', taskStatus, taskid);
    }

    toJSON(): Object {
        return {
            taskid: this.getTaskId(),
            name: this.getName(),
            description: this.getDescription(),
            taskTag: this.getTaskTag(),
            taskStatus: this.getStatus()
        };
    }

    printTask(): void {
        console.log(this.toJSON());
    }
}
