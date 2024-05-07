import Task from './Task';
import { TaskTag } from '../enums/TaskTag';

export default class TaskRiparazione extends Task {

    #nomeRichiedente: String;
    #cognomeRichiedente: String;
    #emailRichiedente: String;
    // #images: Image[];
    #phoneNumber: String;

    // Empty constructor
    constructor();

    constructor(name: String, description: String,
                nomeRichiedente: String, cognomeRichiedente: String,
                emailRichiedente: String, phoneNumber: String);


    constructor(name?: String, description?: String,
                nomeRichiedente?: String, cognomeRichiedente?: String,
                emailRichiedente?: String, phoneNumber?: String) {

        super(name, description, TaskTag.Riparazione);

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
            phoneNumber: this.getProneNumber(),
            assignedTo: this.getAssignedTo()
        };
    }
    
    printTask(): void{
        console.log(this.toJSON());
    }
}
