import {GestorDbMongo} from "../../contenedores/GestorDB.Mongo.js";
import {ChatSchema} from "./schemas/Chat.Mongo.Schema.js";



export class ChatDAOMongo extends GestorDbMongo{

    constructor(){
        super(process.env.STRING_CONNECTION,"chats",ChatSchema);   
      }
}