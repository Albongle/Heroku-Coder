const Factory = require("./Factory");
const CarritoDAOMongo = require("../dao/mongo/CarritoMongo.DAO");
const CarritoDAOFile = require("../dao/file/Carrito.File.DAO");



module.exports = class CarritoFactory extends Factory {
    static manager;
    constructor () {
        super();
        CarritoFactory.manager = null;
    }


    static getManagerCarrito(){
        if(CarritoFactory.manager === null){
            if(this.prototype.persistencia === "mongo") {
                CarritoFactory.manager = new CarritoDAOMongo();
            }else{
                CarritoFactory.manager = new CarritoDAOFile();
            }
        }
        return CarritoFactory.manager;
    }
}