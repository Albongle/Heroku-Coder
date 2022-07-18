import "dotenv/config";
import logger from "./logs/logger.js";
import {engine as expressHbs} from "express-handlebars";
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {router as api} from "./routes/Index.Route.js";
import mdw from  "./middlewares/middlewares.js";
import {ChatFactory} from "./factory/Chat.Factory.js";
import {Server as socketIo} from "socket.io";
import session from "express-session";
import cookieParse from "cookie-parser";
import MongoStore from "connect-mongo";





function startServer(puerto){
    const app = express();    
    //settings
    app.set("port",process.env.PORT || puerto);
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.engine("hbs",expressHbs({
        extname: ".hbs",
        defaultLayout:"layout",
        layoutsDir: path.join(__dirname,"/views/layouts/"),
        partialsDir: path.join(__dirname,"/views/partials/"),
    }));

    app.use(cookieParse());
    app.use(session({
        store:MongoStore.create({mongoUrl:process.env.STRING_CONNECTION, mongoOptions:{useNewUrlParser:true, useUnifiedTopology:true}}),
        secret:"shhhhhhhhhhhhhhhhhhhhhh",
        resave:false,
        saveUninitialized:false,
        cookie:{
                maxAge:600000
        }
    }));


    app.set("views",path.join(__dirname,"views"));
    app.set("view engine", "hbs");

    //routes
    app.use(api);

  


    //middlewares
    app.use(express.static(path.join(__dirname, "public")));
    app.use(mdw.rutaNoImplementada);


    const server = app.listen(app.get("port"),()=>logger.getLogger().info(`servidor escuchando en ${app.get("port")}, proceso ${process.pid}`));

    server.on("error", (error)=> logger.getLogger("error").error(`error en servidor ${error}`));


    //SocketIO y Creaccion de la BD para almacenar los mensajes


    const io = new socketIo(server);
    const gestorChatsDao = ChatFactory.getManagerChat();

    io.on("connection",(socket)=>{
        logger.getLogger().info("Usuario conectado con ID", socket.id);    
        socket.on("chat:tiping",(data)=>{
            socket.broadcast.emit("chat:tiping", data);
        });
        socket.on("new:message",async (data)=>{
            io.sockets.emit("new:message", data);
            gestorChatsDao.addElementos(data)
            .then(()=>gestorChatsDao.getAllElementos()
            .then(message=> logger.getLogger().info(`nuevo mensaje recibido ${message}`))); 
        });
    });
    app.io = io;

    return server;
}


process.on("message",puerto=>{
    startServer(puerto);
});

export {startServer};

