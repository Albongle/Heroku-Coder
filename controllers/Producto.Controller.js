import {ProductoRepository} from "../repository/Producto.Repository.js";




export class ProductoController{

    static obtenerListadoDeProductos(req,res){
        res.status(200).json({status:"ok",code:200,productosFaker:ProductoRepository.getAllProductosFaker(), usuario:req.user,message:`Solicitud procesada con exito`})
    }


    static obtenerListadoDeProductosFaker(_req,res){
        res.status(200).json({status:"ok",code:200,productosFaker:ProductoRepository.getAllProductosFaker(),message:`Solicitud procesada con exito`})
    }

    static addProducto(req,res){
        try {
            const producto = ProductoRepository.addProductos(req.body);
            res.status(200).json({status:"ok",code:200,producto,message:`Solicitud procesada con exito`});
        } catch (error) {
            res.status(206).send({status:"error",code:206,message:`No se recibio alguno de los parametros para el alta del producto`});
        }
    }
}