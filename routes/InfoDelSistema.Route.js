import express from "express";
const router = express.Router();
import compression from "compression";
import {InfoController} from "../controllers/Info.Controller.js";

router.get("",InfoController.obtenerInformacionDelSistema);

router.get("/comprimida", compression(),InfoController.obtenerInformacionDelSistema);



export {router};