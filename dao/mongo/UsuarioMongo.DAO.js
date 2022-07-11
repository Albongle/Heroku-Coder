import {GestorDbMongo} from "../../contenedores/GestorDB.Mongo.js";
import {UsuarioSchema} from "./schemas/Usuario.Mongo.Schema.js";



export class UsuariosDAOMongo extends GestorDbMongo{

  constructor(){
      super(process.env.STRING_CONNECTION,"usuarios",UsuarioSchema);   
  }

  
}