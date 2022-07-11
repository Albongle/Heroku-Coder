import express from "express";
const router = express.Router();
import path from "path";
import {fork} from "child_process";

router.get("",(req,res)=>{

    let cant = req.query.cant ?? 100000000;
    const proceso = fork(path.join(__dirname,"../modules/numeros_random/random.js"));

    proceso.on("message", data=>{
        res.status(200).json(data);
    });
    proceso.send(cant);
        
});


export {router};