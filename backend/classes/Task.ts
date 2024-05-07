import { TaskTag } from '../enums/TaskTag';
import { TaskStatus } from '../enums/TaskStatus';

import { ObjectId } from 'mongodb';

// Abstract class
export default abstract  class Task {

    #name: String;
    #description: String;
    #taskTag: TaskTag;
    #taskStatus: TaskStatus;
    #taskid: ObjectId;
    #assignedTo: String;

    // Empty constructor
    constructor();

    constructor(name: String, description: String,
                taskTag: TaskTag);

    constructor(name?: String, description?: String,
                taskTag?: TaskTag) {

        this.#name = name;
        this.#description = description;
        this.#taskTag = taskTag;
        this.#taskStatus = TaskStatus.DaEseguire;
        this.#taskid = new ObjectId();
        this.#assignedTo = null; // When a task is created,
                                 // it is not assigned to anyone
    }

    getName(): String {
        return this.#name;
    }

    getDescription(): String {
        return this.#description;
    }

    getTaskTag(): TaskTag {
        return this.#taskTag;
    }

    getStatus(): TaskStatus {
        return this.#taskStatus;
    }

    setStatus(taskStatus: TaskStatus) {
        this.#taskStatus = taskStatus;
    }

    getTaskId(): String {
        return this.#taskid.toString();
    }

    getAssignedTo(): String {
        return this.#assignedTo;
    }

    setAssignedTo(assignedTo: String) {
        this.#assignedTo = assignedTo;
    }

    toJSON(): Object {
        return {};
    }
}
