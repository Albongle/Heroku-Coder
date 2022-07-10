const Factory = require("./Factory");
const ChatDAOMongo = require("../dao/mongo/ChatMongo.DAO");
const ChatDAOFile = require("../dao/file/Chat.File.DAO");



module.exports = class ChatFactory extends Factory {
    static manager;
    constructor () {
        super();
        ChatFactory.manager = null;
    }


    static getManagerChat(){
        if(ChatFactory.manager === null){
            if(this.prototype.persistencia === "mongo") {
                ChatFactory.manager = new ChatDAOMongo();
            }else{
                ChatFactory.manager = new ChatDAOFile();
            }
        }
        return ChatFactory.manager;
    }
}