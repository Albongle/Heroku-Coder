const GestorArchivo = require("../../contenedores/Gestor.Archivo")



module.exports = class ChatDAOFile extends GestorArchivo{
    constructor () {
        super("chat.txt");
    }
}