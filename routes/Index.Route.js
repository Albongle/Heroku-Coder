import express from "express";
const router = express.Router();
import {router as apiUsuario} from "./Usuario.Route.js";
import {router as apiCarrito} from "./Carrito.Route.js";
import {router as apiFaker } from "./Producto.Route.js";
import {router as apiInfo} from "./InfoDelSistema.Route.js";
import {router as apiRandom}from "./Random.Route.js";
import {router as apiView}from "./Views.Router.js";
import swagger from "../modules/swagger/swagger.js";
import graphqlHTTP  from "../modules/graphql/graphql.js";




router.use("/view",apiView);

router.use("/api/usuario",apiUsuario);

router.use("/api-docs", swagger.serve, swagger.setup);  

router.use("/api/info", apiInfo);

router.use("/api/randoms", apiRandom);

router.use("/api/productos", apiFaker);

router.use("/api/carrito", apiCarrito);

router.use("/api/graphql",graphqlHTTP.middlewareGraphQl);

router.get("/",(_req,res)=>res.json({messagge:`Bienvenido a la api de Alejandro Bongioanni, para acceder dirijase al link`, link:`/api/usuario/login (postman) o /view/login (para interfaz visual)`}));

export {router};