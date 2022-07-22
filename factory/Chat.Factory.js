import {ChatDAOMongo} from "../dao/mongo/ChatMongo.DAO.js";

export class ChatFactory{
    static #manager = null;
    constructor () {
        ChatFactory.#manager = null;
    }


    static getManagerChat(){
        if(ChatFactory.#manager === null){
            ChatFactory.#manager = new ChatDAOMongo();
        }
        return ChatFactory.#manager;
    }
}