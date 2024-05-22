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
