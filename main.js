import cluster from "cluster";
import {fork} from "child_process";
import os from "os";
const cpus = os.cpus();
import minimist from "minimist";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {startServer} from "./server.js";
const options= {default:{modo:"fork",port:8080},alias:{m:"modo",p:"port"}};
const modo = minimist(process.argv,options).modo;
const puerto = minimist(process.argv,options).port;



if(modo === "fork"){

    const proceso = fork(path.join(__dirname,"server.js"));
    proceso.send(puerto);

}else{
    if (cluster.isPrimary) {
        const cantCpus =cpus.length;
        for (let i = 0; i < cantCpus; i++) {
            cluster.fork();
        }
        cluster.on('exit', worker => {
            console.log(`que en paz descanse el proceso: '${worker.process.pid}'`); 
            cluster.fork();
        });
    }else{
        startServer(puerto);
    }

}
