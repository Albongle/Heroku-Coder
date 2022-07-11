import {GestorDbMongo} from "../../contenedores/GestorDB.Mongo.js";
import {CarritoSchema} from "./schemas/Carrito.Mongo.Schema.js";



export class CarritoDAOMongo extends GestorDbMongo{

      constructor(){
        super(process.env.STRING_CONNECTION,"carrito",CarritoSchema);   
      }
}