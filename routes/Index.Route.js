const express = require("express");
const router = express.Router();
const apiUsuario = require("./Usuario.Route");
const apiCarrito = require("./Carrito.Route");
const apiFaker = require("./ProductoTest.Route");
const apiInfo = require("./InfoDelSistema.Route");
const apiRandom = require("./Random.Route");

router.use(apiUsuario);

router.use("/api/info", apiInfo);

router.use("/api/randoms", apiRandom);

router.use("/api/productos-test", apiFaker);

router.use("/api/carrito", apiCarrito);

router.get("/puerto",(_req,res)=>res.send(`servidor escuchando en ${router.get("port")}, proceso ${process.pid}`));

module.exports = router;