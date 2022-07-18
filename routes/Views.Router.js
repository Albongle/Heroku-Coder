import express from "express";
import { ViewController } from "../controllers/Views.Controller.js";
const router = express.Router();
import mdw from "../middlewares/middlewares.js";



//routes
router.get("",mdw.isAutenticated,ViewController.renderizarHome);

router.get("/login",ViewController.renderizarLogin);

router.get("/alta",ViewController.renderizarRegistrar);




export {router};