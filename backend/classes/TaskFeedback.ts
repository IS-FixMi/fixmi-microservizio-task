import TaskSupporto from './TaskSupporto';

import TaskTag from '../enums/TaskTag';
import TaskStatus from '../enums/TaskStatus';

export default class TaskFeedback extends TaskSupporto {

    #ideePerMigliorare: String;
    #disponibilitaAzienda: String;
    #velocitaRiparazione: String;
    #soddisfazioneRiparazione: String;
    #soddisfazioneSitoWeb: String;

    constructor(name: String, description: String,
                taskStatus: TaskStatus, taskId: Number,
                ideePerMigliorare: String, disponibilitaAzienda: String,
                velocitaRiparazione: String,
                soddisfazioneRiparazione: String,
                soddisfazioneSitoWeb: String) {

        super(name, description, 'Feedback', taskStatus, taskId);

        this.#ideePerMigliorare = ideePerMigliorare;
        this.#disponibilitaAzienda = disponibilitaAzienda;
        this.#velocitaRiparazione = velocitaRiparazione;
        this.#soddisfazioneRiparazione = soddisfazioneRiparazione;
        this.#soddisfazioneSitoWeb = soddisfazioneSitoWeb;
    }

    getIdeePerMigliorare(): String {
        return this.#ideePerMigliorare;
    }

    getDisponibilitaAzienda(): String {
        return this.#disponibilitaAzienda;
    }

    getVelocitaRiparazione(): String {
        return this.#velocitaRiparazione;
    }

    getSoddisfazioneRiparazione(): String {
        return this.#soddisfazioneRiparazione;
    }

    getSoddisfazioneSitoWeb(): String {
        return this.#soddisfazioneSitoWeb;
    }

    toJSON(): Object {
        return {
            taskid: this.getTaskId(),
            name: this.getName(),
            description: this.getDescription(),
            taskTag: this.getTaskTag(),
            taskStatus: this.getStatus(),
            ideePerMigliorare: this.getIdeePerMigliorare(),
            disponibilitaAzienda: this.getDisponibilitaAzienda(),
            velocitaRiparazione: this.getVelocitaRiparazione(),
            soddisfazioneRiparazione: this.getSoddisfazioneRiparazione(),
            soddisfazioneSitoWeb: this.getSoddisfazioneSitoWeb()
        };
    }

    printTask(): void {
        console.log(this.toJSON());
    }

}
