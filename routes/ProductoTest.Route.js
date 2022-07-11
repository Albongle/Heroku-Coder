import express from "express";
import {ProductoController} from "../controllers/Producto.Controller.js";
const router = express.Router();
import mdw from "../middlewares/middlewares.js";

router.get("",mdw.validarSession,ProductoController.obtenerListadoDeProductos);




export {router};