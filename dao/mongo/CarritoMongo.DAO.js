const GestorDbMongo = require("../../contenedores/GestorDB.Mongo");
const CarritoSchema = require("./schemas/Carrito.Schema");



module.exports = class CarritoDAOMongo extends GestorDbMongo{

      constructor(){
        super(process.env.STRING_CONNECTION,"carrito",CarritoSchema);   
      }
}