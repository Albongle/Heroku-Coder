const ChatDAOMongo = require("../dao/mongo/ChatMongo.DAO");

module.exports = class ChatFactory{
    static manager = null;
    constructor () {
        ChatFactory.manager = null;
    }


    static getManagerChat(){
        if(ChatFactory.manager === null){
            ChatFactory.manager = new ChatDAOMongo();
        }
        return ChatFactory.manager;
    }
}