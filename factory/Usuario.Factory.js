import {UsuariosDAOMongo} from "../dao/mongo/UsuarioMongo.DAO.js";
export class UsuarioFactory{
    static manager = null;
    constructor () {
        UsuarioFactory.manager = null;
    }
    
    static getManagerUsuario(){

        if(UsuarioFactory.manager === null){
            UsuarioFactory.manager = new UsuariosDAOMongo();
        }
        return UsuarioFactory.manager;
    }
}