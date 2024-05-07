import TaskSupporto from './TaskSupporto';
import { TaskTag } from '../enums/TaskTag';

export default class TaskFeedback extends TaskSupporto {

    #ideePerMigliorare: String;
    #disponibilitaAzienda: String;
    #velocitaRiparazione: String;
    #soddisfazioneRiparazione: String;
    #soddisfazioneSitoWeb: String;

    // Empty constructor
    constructor();

    constructor(name: String, description: String,
                ideePerMigliorare: String, disponibilitaAzienda: String,
                velocitaRiparazione: String,
                soddisfazioneRiparazione: String,
                soddisfazioneSitoWeb: String);

    constructor(name?: String, description?: String,
                ideePerMigliorare?: String, disponibilitaAzienda?: String,
                velocitaRiparazione?: String,
                soddisfazioneRiparazione?: String,
                soddisfazioneSitoWeb?: String) {

        super(name, description, TaskTag.Feedback);

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
            soddisfazioneSitoWeb: this.getSoddisfazioneSitoWeb(),
            assignedTo: this.getAssignedTo()
        };
    }

    printTask(): void {
        console.log(this.toJSON());
    }

}
