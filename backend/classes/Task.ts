import TaskTag from '../enums/TaskTag';
import TaskStatus from '../enums/TaskStatus';

// Abstract class
export default class Task {

    #name: String;
    #description: String;
    #taskTag: TaskTag;
    #taskStatus: TaskStatus;
    #taskid: Number;

    constructor(name: String, description: String,
                taskTag: TaskTag, taskStatus: TaskStatus,
                taskid: Number) {

        this.#name = name;
        this.#description = description;
        this.#taskTag = taskTag;
        this.#taskStatus = taskStatus;
        this.#taskid = taskid;
    }

    getName(): String {
        return this.#name;
    }

    getDescription(): String {
        return this.#description;
    }

    getTaskTag(): TaskTag[] {
        return this.#taskTag;
    }

    getStatus(): TaskStatus {
        return this.#taskStatus;
    }

    getTaskId(): Number {
        return this.#taskid;
    }

    setStatus(taskStatus: TaskStatus) {
        this.#taskStatus = taskStatus;
    }

}
