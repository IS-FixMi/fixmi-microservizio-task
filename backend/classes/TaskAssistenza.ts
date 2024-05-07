import TaskSupporto from './TaskSupporto';
import { TaskTag } from '../enums/TaskTag';

export default class TaskAssistenza extends TaskSupporto {
    
    #emailRichiedente: String;

    // Empty constructor
    constructor();

    constructor(name: String, description: String,
                emailRichiedente: String);

    constructor(name?: String, description?: String,
                emailRichiedente?: String) {

        super(name, description, TaskTag.Assistenza);

        this.#emailRichiedente = emailRichiedente;
    }

    getEmailRichiedente(): String {
        return this.#emailRichiedente;
    }

    toJSON(): Object {
        return {
            taskid: this.getTaskId(),
            name: this.getName(),
            description: this.getDescription(),
            taskTag: this.getTaskTag(),
            taskStatus: this.getStatus(),
            emailRichiedente: this.getEmailRichiedente(),
            assignedTo: this.getAssignedTo()
        };
    }

    printTask(): void{
        console.log(this.toJSON());
    }
}
