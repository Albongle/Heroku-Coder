import {CarritoDAOMongo} from "../dao/mongo/CarritoMongo.DAO.js";



export  class CarritoFactory{
    static #manager = null;
    constructor () {
        CarritoFactory.#manager = null;
    }

    static getManagerCarrito(){
        if(CarritoFactory.#manager === null){

            CarritoFactory.#manager = new CarritoDAOMongo();
        }
        return CarritoFactory.#manager;
    }
}