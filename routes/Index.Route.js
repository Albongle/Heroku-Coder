import express from "express";
const router = express.Router();
import {router as apiUsuario} from "./Usuario.Route.js";
import {router as apiCarrito} from "./Carrito.Route.js";
import {router as apiFaker } from "./ProductoTest.Route.js";
import {router as apiInfo} from "./InfoDelSistema.Route.js";
import {router as apiRandom}from "./Random.Route.js";

router.use(apiUsuario);

router.use("/api/info", apiInfo);

router.use("/api/randoms", apiRandom);

router.use("/api/productos", apiFaker);

router.use("/api/carrito", apiCarrito);

router.get("/puerto",(_req,res)=>res.send(`servidor escuchando en ${router.get("port")}, proceso ${process.pid}`));

export {router};