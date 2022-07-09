const express = require ("express");
const ProductoController = require("../controllers/Producto.Controller");
const router = express.Router();


router.get("",ProductoController.obtenerListadoDeProductos);




module.exports = router;