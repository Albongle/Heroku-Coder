import express from "express";
const router = express.Router();
import mdw from "../middlewares/middlewares.js";
import {upload} from "../modules/multer/multer.js"; //importo multer para agregarlo como mdw en el endpoint
import {UsuarioController} from "../controllers/Usuario.Controller.js";


//routes


router.post("/login",UsuarioController.loguearUsuario);

router.post("/alta",upload.single("archivo"),UsuarioController.registrarUsuario);

router.post("/logout",mdw.isAutenticated,UsuarioController.desloguearUsuario);



export {router};