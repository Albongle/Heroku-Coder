import express from "express";
const router = express.Router();
import session from "express-session";
import cookieParse from "cookie-parser";
import MongoStore from "connect-mongo";
import {passport} from "../modules/passport/passport.js";
import mdw from "../middlewares/middlewares.js";
import {upload} from "../modules/multer/multer.js"; //importo multer para agregarlo como mdw en el endpoint
import {UsuarioController} from "../controllers/Usuario.Controller.js";


//middlewares
//agreggo mdw de passport
router.use(cookieParse());
router.use(session({
    store:MongoStore.create({mongoUrl:process.env.STRING_CONNECTION, mongoOptions:{useNewUrlParser:true, useUnifiedTopology:true}}),
    secret:"shhhhhhhhhhhhhhhhhhhhhh",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:600000
    }
}));
router.use(passport.initialize());
router.use(passport.session());

//routes
router.get("/",mdw.validarSession,UsuarioController.renderizarHome);

router.get("/login",UsuarioController.renderizarLogin); 

router.get("/failLogin",UsuarioController.renderizarFalloAlLoguear); 

router.get("/failAlta",UsuarioController.renderizarFalloAlRegistrar); 

router.post("/login",passport.authenticate("login",{failureRedirect:"/failLogin", successRedirect:"/"}));

router.post("/alta",upload.single("archivo"),passport.authenticate("alta",{failureRedirect:"/failAlta", successRedirect:"/"}));

router.get("/alta",UsuarioController.renderizarRegistrar);

router.post("/logout",UsuarioController.desloguearUsuario);



export {router};