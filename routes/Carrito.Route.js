import express from "express";
import {CarritoController} from "../controllers/Carrito.Controller.js";
const router = express.Router();
import mdw from "../middlewares/middlewares.js";

router.get("",mdw.validarSession,CarritoController.obtenerCarritoDelUsuario);

router.post("",mdw.validarSession,CarritoController.agregarProductoAlCarrito);

router.post("/comprar",mdw.validarSession, CarritoController.procesarCompra);

router.delete("/",mdw.validarSession, CarritoController.quitarProductoDelCarrito);

export {router};