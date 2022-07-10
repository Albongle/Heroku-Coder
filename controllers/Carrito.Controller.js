const CarritoRespository = require("../repository/Carrito.Repository");


module.exports = class CarritoController{

    static async obtenerCarritoDelUsuario(req, res){

        const carrito = await CarritoRespository.getCarrito(req.session.passport.user);
        if(carrito){
            const respuesta ={status:"ok",code:200,message:`Solicitud procesada exitosamente`, carrito};
            req.app.io.sockets.emit("refresh-carrito",{respuesta});
            res.status(200).json(respuesta);
        }else{
            res.status(204).json({status:"ok",code:204,message:`Sin contenido`,carrito:{productos:[]}});
        }
    }

    static async agregarProductoAlCarrito(req, res){

        const carrito = await CarritoRespository.addProducto(req.session.passport.user, req.body);
        if(carrito){
            const respuesta ={status:"ok",code:200,message:`Se agrego producto al carrito`, carrito};
            req.app.io.sockets.emit("refresh-carrito",{respuesta});
            res.status(200).json(respuesta);
        }else{
            res.status(204).json({status:"ok",message:"No se pudo procesar la solicitud", code:204});
        }
    }

    static async quitarProductoDelCarrito(req,res){

        const carrito = await CarritoRespository.deleteProducto(req.session.passport.user,req.body)
        if(carrito){
            const respuesta ={status:"ok",code:200,message:`Se elimino el producto`, carrito};
            req.app.io.sockets.emit("refresh-carrito",{respuesta});
            res.status(200).json(respuesta);
        }else{
            res.status(204).json({status:"ok",message:"No se pudo procesar la solicitud", code:204});
        }

    }
    static async procesarCompra(req,res){


        const resultado = await CarritoRespository.deleteCarrito(req.session.passport.user)
        if(resultado){
            const respuesta ={status:"ok",message:"Venta procesada con exito", code:200, carrito:{productos:[]}};
            req.app.io.sockets.emit("refresh-carrito",{respuesta});
            res.status(200).json(respuesta);
        }else{
            res.status(204).json({status:"ok",message:"No se pudo procesar la solicitud", code:204});
        }

    }
}