const GestorArchivo = require("../../contenedores/Gestor.Archivo")



module.exports = class UsuarioDAOFile extends GestorArchivo{
    constructor () {
        super("usuarios.txt");
    }
}