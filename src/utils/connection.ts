//const PORT = process.env.REACT_APP_BACKEND_PORT || "3001";

import qs from "qs";

const baseURL = "http://127.0.0.1:"+7777;

export function getTaskDaEseguire(token:string){
    const options  = { 
        method: "POST",
        headers:{"Content-Type": "application/x-www-form-urlencoded"},
        body: qs.stringify({token: token})
    }
    return new Request(baseURL.concat("/api/tasks/getListaTaskDaEseguire"),options);
}

export function getStoricoTask(token:string){
    const options = {
        method: "POST",
        headers:{"Content-Type": "application/x-www-form-urlencoded"},
        body: qs.stringify({token: token})
    }
    return new Request(baseURL.concat("/api/tasks/getStoricoTask"),options);
}

export function getTaskInPausa(token:string){
    const options = {
        method: "POST",
        headers:{"Content-Type": "application/x-www-form-urlencoded"},
        body: qs.stringify({token: token})
    }
    return new Request(baseURL.concat("/api/tasks/getListaTaskInPausa"),options);
}

export function getTaskInLavorazione(token:string){
    const options = {
        method: "POST",
        headers:{"Content-Type": "application/x-www-form-urlencoded"},
        body: qs.stringify({token: token})
    }
    return new Request(baseURL.concat("/api/tasks/getListaTaskInLavorazione"),options);
}

export function prendiInCarico(taskid, token) {
    const options  = {
        method: "POST",
        headers:{"Content-Type": "application/x-www-form-urlencoded"},
        body: qs.stringify({
            token: token,
            taskid: taskid,
            taskStatus: "In Lavorazione",
       })
    }
    return fetch(baseURL.concat("/api/tasks/modificaStatoTask"), options);
}

export function mettiInPausa(taskid, token) {
    const options  = {
        method: "POST",
        headers:{"Content-Type": "application/x-www-form-urlencoded"},
        body: qs.stringify({
            token: token,
            taskid: taskid,
            taskStatus: "In Pausa",
       })
    }
    return fetch(baseURL.concat("/api/tasks/modificaStatoTask"), options);
}

export function Completa(taskid, token) {
    const options  = {
        method: "POST",
        headers:{"Content-Type": "application/x-www-form-urlencoded"},
        body: qs.stringify({
            token: token,
            taskid: taskid,
            taskStatus: "Completata",
       })
    }
    return fetch(baseURL.concat("/api/tasks/modificaStatoTask"), options);
}

export function Riprendi(taskid, token) {
    const options  = {
        method: "POST",
        headers:{"Content-Type": "application/x-www-form-urlencoded"},
        body: qs.stringify({
            token: token,
            taskid: taskid,
            taskStatus: "In Lavorazione",
       })
    }
    return fetch(baseURL.concat("/api/tasks/modificaStatoTask"), options);
}
