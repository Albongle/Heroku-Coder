const express = require("express");
const CarritoController = require("../controllers/Carrito.Controller");
const router = express.Router();
const mdw = require("../middlewares/middlewares");

router.get("",mdw.validarSession,CarritoController.obtenerCarritoDelUsuario);

router.post("",mdw.validarSession,CarritoController.agregarProductoAlCarrito);

router.post("/comprar",mdw.validarSession, CarritoController.procesarCompra);

router.delete("/",mdw.validarSession, CarritoController.quitarProductoDelCarrito);

module.exports = router;