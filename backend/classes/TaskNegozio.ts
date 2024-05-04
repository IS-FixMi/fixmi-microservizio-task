import Task from './Task';
import { TaskTag } from '../enums/TaskTag';

export default class TaskNegozio extends Task {

    // Empty constructor
    constructor();

    constructor(name: String, description: String);

    constructor(name?: String, description?: String) {

        super(name, description, TaskTag.Negozio);
    }

    toJSON(): Object {
        return {
            taskid: this.getTaskId(),
            name: this.getName(),
            description: this.getDescription(),
            taskTag: this.getTaskTag(),
            taskStatus: this.getStatus(),
            assignedTo: this.getAssignedTo()
        };
    }

    printTask(): void {
        console.log(this.toJSON());
    }
}
