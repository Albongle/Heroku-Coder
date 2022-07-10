const Factory = require("./Factory");
const UsuariosDAOMongo = require("../dao/mongo/UsuarioMongo.DAO");
const UsuarioDAOFile = require("../dao/file/Usuario.File.DAO");



module.exports = class UsuarioFactory extends Factory {
    static manager;
    constructor () {
        super();
        UsuarioFactory.manager = null;
    }


    static getManagerUsuario(){
        if(UsuarioFactory.manager === null){
            if(this.prototype.persistencia === "mongo") {
                UsuarioFactory.manager = new UsuariosDAOMongo();
            }else{
                UsuarioFactory.manager = new UsuarioDAOFile();
            }
        }
        return UsuarioFactory.manager;
    }
}