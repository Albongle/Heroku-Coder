const GestorArchivo = require("../../contenedores/Gestor.Archivo")



module.exports = class CarritoDAOFile extends GestorArchivo{
    constructor () {
        super("carrito.txt");
    }
}