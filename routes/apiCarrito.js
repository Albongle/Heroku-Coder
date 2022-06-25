const express = require("express");
const agregarProdcutoAlCarrito = require("../controllers/carritoController");
const router = express.Router();
const carritoDAO = require("../dao/carritoDAOMongoDb");
const mdw = require("../middlewares/middlewares");
const gestorCarrito = new carritoDAO();


router.post("",mdw.validarSession, async (req, res)=>{
    const objeto = req.body;
    const respuesta = await agregarProdcutoAlCarrito(gestorCarrito,req.session.passport.user.username,objeto);
    
    req.app.io.sockets.emit("refresh-carrito",{carrito:respuesta});
    res.status(200).json({carrito:respuesta});

});
router.delete("/:id",mdw.validarSession, async (req, res)=>{
    let {id}=req.params;
    if(await gestorCarrito.deleteElementoById(id)){
        res.status(200).json({status:"ok", message:`Se elimino el carrito con id ${id}`});
    }else{
        res.status(406).json({error:'Carrito no encontrado'});
    }
});
router.get("/:id/productos",mdw.validarSession, async (req, res)=>{
    let {id}=req.params;
    const respuesta = await gestorCarrito.getElementoById(id);
    if(respuesta != null){

        res.status(200).json(respuesta.productos);
    }else{
        res.status(406).json({error:'Carrito no encontrado'});
    }
});
router.post("/:id/productos",mdw.validarSession,async (req, res)=>{

    let {id}=req.params;
    const objeto = req.body;
    if(await gestorCarrito.updateElemento(id, {username:req.session.passport.user.username,productos:objeto})){
        res.status(200).json({status:"carrito actualizado"});
    }else{
        res.status(406).json({error:'Carrito no encontrado'});
    }

});
router.delete("/:id/productos/:id_productos",mdw.validarSession,async (req, res)=>{

    let {id,id_productos}=req.params;
    const respuesta = await gestorCarrito.getElementoById(id);
    if(respuesta != null){
        let indice = respuesta.productos.findIndex(x=> x._id=== id_productos);
        if(indice>0){
            const resultado = respuesta.productos.splice(indice,1);
            await gestorCarrito.updateElemento(id,{username:req.session.passport.user.username,productos:resultado});
            res.status(200).json({status:"ok", message:"carrito actualizado"});
        }else{
            res.status(406).json({error:'Producto no encontrado en el carrito'});
        }
    }else{
        res.status(406).json({error:'Carrito no encontrado'});
    }

});


module.exports = router;