import passport from "passport";
import {Strategy as localStrategy} from "passport-local";
import logger from "../../logs/logger.js";

import {UsuarioRespository} from "../../repository/Usuario.Repository.js";
import  { esPassWordValido, encriptarPassword } from "../bcrypt/bcrypt.js";



//config
//configuro passport, dentro obtiene los usuarios de la BD
passport.use("login", new localStrategy(async (username, password, done)=>{
    try{
        const usuario =  await UsuarioRespository.getUsuarioByUsername(username);
        if(usuario.username === username && esPassWordValido(password,usuario.password)){
            return done(null, usuario);
        }
    }
    catch(error){
        logger.getLogger("error").error(error);
    }
    return done(null,false);
    
}));

passport.use("alta", new localStrategy({ passReqToCallback: true },async (req,_username, _password, done)=>{
    try{
        const nuevoUsuario = await UsuarioRespository.addUsuarios({...req.body,password:encriptarPassword(req.body.password),img:req.file.filename})
        if(nuevoUsuario){
            return done(null,nuevoUsuario);
        }
    }
    catch(error){
        logger.getLogger("error").error(error);
    }
    return done(null,false);
 }));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

export {passport};