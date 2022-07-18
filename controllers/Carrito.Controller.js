import {CarritoRespository} from "../repository/Carrito.Repository.js";


export class CarritoController{

    static obtenerCarritoDelUsuario(req, res){

        CarritoRespository.getCarrito(req.user)
        .then(carrito=>{
            if(carrito){
                const respuesta ={status:"ok",code:200,message:`Solicitud procesada exitosamente`, carrito};
                req.app.io.sockets.emit("refresh-carrito",{respuesta});
                res.status(200).json(respuesta);
            }else{
                res.status(206).json({status:"ok",code:206,message:`Sin contenido`,carrito:{productos:[]}});
            }
        })
        .catch(error=>res.status(500).json({status:"error",code:500,message:`${error.message}`}));
    }

    static agregarProductoAlCarrito(req, res){ 

        
        CarritoRespository.addProducto(req.user, req.body)
        .then(carrito=>{
            if(carrito){
                const respuesta ={status:"ok",code:200,message:`Se agrego producto al carrito`, carrito};
                req.app.io.sockets.emit("refresh-carrito",{respuesta});
                res.status(200).json(respuesta);
            }else{
                    res.status(206).json({status:"ok",message:"No se pudo procesar la solicitud", code:206});
            }

        })        
        .catch(error=>res.status(500).json({status:"error",code:500,message:`${error.message}`}));
    }


    static quitarProductoDelCarrito(req,res){
        
        CarritoRespository.deleteProducto(req.user,req.body)
        .then(carrito=>{
            if(carrito){
                const respuesta ={status:"ok",code:200,message:`Se elimino el producto`, carrito};
                req.app.io.sockets.emit("refresh-carrito",{respuesta});
                res.status(200).json(respuesta);
            }else{
                res.status(206).json({status:"ok",code:206,message:"No se pudo procesar la solicitud"});
            }

        })
        .catch(error=>res.status(500).json({status:"error",code:500,message:`${error.message}`}));
    }
    static async procesarCompra(req,res){

        carritoRespository.deleteCarrito(req.user)
        .then(resultado=>{
            if(resultado){
                const respuesta ={status:"ok",message:"Venta procesada con exito", code:200, carrito:{productos:[]}};
                req.app.io.sockets.emit("refresh-carrito",{respuesta});
                res.status(200).json(respuesta);
            }else{
                res.status(206).json({status:"ok",code:206,message:"No se pudo procesar la solicitud"});
            }
        })      
        .catch(error=> res.status(500).json({status:"error",code:500,message:`${error.message}`}));
        }
    
}   