import Task from './Task';
import { TaskTag } from '../enums/TaskTag';

// Abstract
export default abstract class TaskSupporto extends Task {

    // Empty constructor
    constructor();
    
    constructor(name: String, description: String,
                taskTag: TaskTag);

    constructor(name?: String, description?: String,
                taskTag?: TaskTag) {

                super(name, description, taskTag);
    }
}
