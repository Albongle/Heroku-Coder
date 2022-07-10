const GestorDbMongo = require("../../contenedores/GestorDB.Mongo");
const ChatSchema = require("./schemas/Chat.Mongo.Schema");



module.exports = class ChatsDAOMongo extends GestorDbMongo{

    constructor(){
        super(process.env.STRING_CONNECTION,"chats",ChatSchema);   
      }
}