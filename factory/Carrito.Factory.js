const CarritoDAOMongo = require("../dao/mongo/CarritoMongo.DAO");



module.exports = class CarritoFactory{
    static manager = null;
    constructor () {
        CarritoFactory.manager = null;
    }

    static getManagerCarrito(){
        if(CarritoFactory.manager === null){

            CarritoFactory.manager = new CarritoDAOMongo();
        }
        return CarritoFactory.manager;
    }
}