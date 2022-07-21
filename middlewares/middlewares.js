import logger from "../logs/logger.js";
import { JsonWebToken } from "../modules/jwt/jsonWebToken.js";

function rutaNoImplementada(req,res,_next){
    logger.getLogger("warn").warn({ruta:req.path, metodo:req.method});
    res.status(404).json({status:"error",code:404, message:`ruta método ${req.method} no implementada`});
}

function isAutenticated(req, res, next)
{ 
    const authorization = req.headers.authorization || req.session.authorization;
    if(authorization){
        const accessToken = authorization.split(" ")[1];
        JsonWebToken.validaAccessToken(accessToken,(error,decode)=>{
            if(!error){
                req.user = decode;
                next();
            }else{

                res.status(401).json({status:"error",code:401, message:`Acceso denegado dirijase al link`, link:`/api/usuatrio/login (postman)  o  /view/login (para interfaz visual)`});
            }
        });
    }else{
        res.status(401).json({status:"error",code:401, message:`Acceso denegado, dirijase al link`,llink:`/api/usuatrio/login (postman)  o  /view/login (para interfaz visual)`});
    }
}


export default {rutaNoImplementada, isAutenticated};