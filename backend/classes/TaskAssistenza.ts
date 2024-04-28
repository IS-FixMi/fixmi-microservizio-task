import TaskSupporto from './TaskSupporto';

import TaskTag from '../enums/TaskTag';
import TaskStatus from '../enums/TaskStatus';

export default class TaskAssistenza extends TaskSupporto {
    
    #emailRichiedente: String;

    constructor(name: String, description: String,
                taskStatus: TaskStatus, taskid: Number,
                emailRichiedente: String) {

        super(name, description, 'Assistenza', taskStatus, taskid);

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
            emailRichiedente: this.getEmailRichiedente()
        };
    }

    printTask(): void{
        console.log(this.toJSON());
    }
}
