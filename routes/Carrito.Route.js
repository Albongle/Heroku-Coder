import express from "express";
import {CarritoController} from "../controllers/Carrito.Controller.js";
const router = express.Router();
import mdw from "../middlewares/middlewares.js";

router.get("",mdw.isAutenticated,CarritoController.obtenerCarritoDelUsuario);

router.post("",mdw.isAutenticated,CarritoController.agregarProductoAlCarrito);

router.post("/comprar",mdw.isAutenticated, CarritoController.procesarCompra);

router.delete("/",mdw.isAutenticated, CarritoController.quitarProductoDelCarrito);

export {router};