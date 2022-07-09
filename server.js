const logger = require("./logs/logger");

function startServer(puerto){
    require("dotenv").config();
    const express = require("express");
    const app = express();
    const path = require("path");
    const socketIo= require("socket.io");
    const api = require("./routes/Index.Route");
    const mdw = require("./middlewares/middlewares");
    const ChatsDAO = require("./dao/mongo/ChatsMongo.DAO");
    const {engine:expressHbs}= require("express-handlebars");


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


    const io = socketIo(server);
    const gestorChatsDao = new ChatsDAO();

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

}


process.on("message",puerto=>{
    startServer(puerto);
});

module.exports = startServer;

