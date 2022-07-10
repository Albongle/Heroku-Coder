const UsuariosDAOMongo = require("../dao/mongo/UsuarioMongo.DAO");
module.exports = class UsuarioFactory{
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