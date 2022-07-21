import logger from "../logs/logger.js";
import {UsuarioRespository} from "../repository/Usuario.Repository.js";
import  { esPassWordValido, encriptarPassword } from "../modules/bcrypt/bcrypt.js";
import { JsonWebToken } from "../modules/jwt/jsonWebToken.js";
export class UsuarioController{

    static loguearUsuario(req,res){
        const {username,password } = req.body;    
        UsuarioRespository.getUsuarioByUsername(username)
        .then(usuario=>{
            if(usuario.username === username && esPassWordValido(password,usuario.password)){
                const accesToken = JsonWebToken.generateAccessToken(usuario);
                req.session.authorization = `Bearer ${accesToken}`;
                req.header.authorization = `Bearer ${accesToken}`;
                res.status(200).json({status:"ok", code:200, message:"Login realizado con exito, puede dirigirse a /view para interfaz visual", token:accesToken});
            }else{
                res.status(401).json({status:"error", code:401, message:"Usuario o contraseña invalidos"});
            }
        })
        .catch(error=>{
            console.log(error);
            res.status(401).json({status:"error", code:401, message:"Usuario o contraseña invalidos"});
            logger.getLogger("error").error(error);
        });
    }

    static registrarUsuario(req,res){
    
        const {username}= req.body;
        UsuarioRespository.getUsuarioByUsername(username)
        .then(()=>{
            res.render("pages/registrar",{error:"Usuario ya existente"});
        })
        .catch(()=>{
            UsuarioRespository.addUsuarios({...req.body,password:encriptarPassword(req.body.password),img:req.file.filename})
            .then(usuario=>
                {
                    const accesToken = JsonWebToken.generateAccessToken(usuario);
                    req.session.authorization = `Bearer ${accesToken}`;
                    req.header.authorization = `Bearer ${accesToken}`;
                    res.status(200).json({status:"ok", code:200, message:"Alta realizada con exito, puede dirigirse a /view para interfaz visual", token:accesToken});
                }
            )
            .catch(()=>res.status(206).json({status:"ok",code:206,message:"No se recibio alguno de los parametros necesarios para el alta"}));
        });
    }



    static desloguearUsuario(req,res){
        req.session.destroy(error=>{
            if(!error){
                res.status(200).json({status:"ok", code:200, message:"Deslogueo realizo con exito"}); 
            }
        });
    }


}