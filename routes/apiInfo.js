const express = require("express");
const router = express.Router();
const os = require("os");
const compression = require("compression");

router.get("",(_req,res)=>{
   
    const objeto = {
        carpeta_proyecto:process.cwd(),
        path_ejecucion:process.execPath,
        plataforma:process.platform,
        argumentos:process.argv.slice(2),
        version_node:process.version,
        process_id:process.pid,
        memoria_total:process.memoryUsage().rss,
        procesadores_presentes:os.cpus().length,
    }
    res.status(200).json(objeto);
});

router.get("/comprimida", compression(), (_req,res)=>{
    const objeto = {
        carpeta_proyecto:process.cwd(),
        path_ejecucion:process.execPath,
        plataforma:process.platform,
        argumentos:process.argv.slice(2),
        version_node:process.version,
        process_id:process.pid,
        memoria_total:process.memoryUsage().rss,
        procesadores_presentes:os.cpus().length,
    }
    res.status(200).json(objeto);
});


module.exports = router;