import express from "express";
import {ProductoController} from "../controllers/Producto.Controller.js";
const router = express.Router();
import mdw from "../middlewares/middlewares.js";

router.get("",mdw.isAutenticated,ProductoController.obtenerListadoDeProductos);

router.get("/faker",ProductoController.obtenerListadoDeProductosFaker);

router.post("/faker",ProductoController.addProducto);

export {router};