import Task from './Task';

import TaskTag from '../enums/TaskTag';
import TaskStatus from '../enums/TaskStatus';

export default class TaskRiparazione extends Task {

    #nomeRichiedente: String;
    #cognomeRichiedente: String;
    #emailRichiedente: String;
    // #images: Image[];
    #phoneNumber: String;

    constructor(name: String, description: String,
                taskStatus: TaskStatus, taskid: Number,
                nomeRichiedente: String, cognomeRichiedente: String,
                emailRichiedente: String, phoneNumber: String) {

        super(name, description, 'Riparazione', taskStatus, taskid);

        this.#nomeRichiedente = nomeRichiedente;
        this.#cognomeRichiedente = cognomeRichiedente;
        this.#emailRichiedente = emailRichiedente;
        this.#phoneNumber = phoneNumber;
    }

    getNomeRichiedente(): String {
        return this.#nomeRichiedente;
    }

    getCongnomeRichiedente(): String {
        return this.#cognomeRichiedente;
    }

    getEmailRichiedente(): String {
        return this.#emailRichiedente;
    }

    getProneNumber(): String {
        return this.#phoneNumber;
    }

    toJSON(): Object {
        return {
            taskid: this.getTaskId(),
            name: this.getName(),
            description: this.getDescription(),
            taskTag: this.getTaskTag(),
            taskStatus: this.getStatus(),
            nomeRichiedente: this.getNomeRichiedente(),
            cognomeRichiedente: this.getCongnomeRichiedente(),
            emailRichiedente: this.getEmailRichiedente(),
            phoneNumber: this.getProneNumber()
        };
    }
    
    printTask(): void{
        console.log(this.toJSON());
    }
}
