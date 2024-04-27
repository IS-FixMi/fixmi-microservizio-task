import Task from './Task';

import TaskTag from '../enums/TaskTag';
import TaskStatus from '../enums/TaskStatus';

// Abstract
export default class TaskSupporto extends Task {

    constructor(name: String, description: String,
                taskTag: TaskTag, taskStatus: TaskStatus,
                taskid: Number) {

                super(name, description, taskTag, taskStatus, taskid);
    }
}
