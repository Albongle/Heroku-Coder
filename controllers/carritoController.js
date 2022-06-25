const carritoDAO = require("../dao/carritoDAOMongoDb");
const gestorCarrito = new carritoDAO();
module.exports = class CarritoController{

    static async agregarProductoAlCarrito(username, producto){
        let data;
        if(username && producto){
            const carritoDelUsuario = (await gestorCarrito.getElementosByParams(username,"username")).shift();
            if(carritoDelUsuario){
                const productoExistente = carritoDelUsuario.productos.find(p=> p.id === producto.id);
                if(productoExistente){
                    productoExistente.cantidad++;
                }
                else{
                    carritoDelUsuario.productos.push(producto);
                }
                data =  await gestorCarrito.updateElemento(carritoDelUsuario._id,carritoDelUsuario);
                }
            else{
                data = await gestorCarrito.addElementos({username:username,productos:producto});
            }
            return {status:"ok",code:200,message:`Se agrego producto al carrito`, carrito:data.shift()};
        }

        return {status:"error",code:404,message:`No se recibieron algunos de los datos necesarios para el alta`};
    }

    static async borrarCarritoPorId(id){

        if(id){
            const data =  await gestorCarrito.deleteElementoById(id);
            if(data.length>0){
                return {status:"ok",code:200,message:`Se elimino el carrito con id ${id}`, carrito:data};
            }
            return {status:"error",message:'Carrito no encontrado', code:406};
        }
        return {status:"error",code:404,message:`No se recibieron algunos de los datos necesarios`};
    }

    static async obtenerProductosDeUnCarrito(id){
        if(id){
            const data =  await gestorCarrito.getElementoById(id);
            if(data != null){
                return {status:"ok",code:200,message:`Solicitud procesada exitosamente`, carrito:data};
            }
            return {status:"error",message:'Carrito no encontrado', code:406};
        }
        return {status:"error",code:404,message:`No se recibieron algunos de los datos necesarios`};
    }

    static async actualizarProductosDeUnCarrito(id, objeto){
        if(id && objeto){
            const data = await gestorCarrito.updateElemento(id, objeto);
            if(data.length>0){
                return {status:"ok",code:200,message:`Se actualizo el carrito con id ${id}`, carrito:data};
            }
            return {status:"error",message:'Carrito no encontrado', code:406};
        }
        return {status:"error",code:404,message:`No se recibieron algunos de los datos necesarios`};
    }
    static async borraUnProductoDeUnCarrito(idCarrito, idProducto){

        if(idCarrito && idProducto){
            const carrito = await gestorCarrito.getElementoById(idCarrito);

            if(carrito != null){
                let indice = carrito.productos.findIndex(p=> p.id === idProducto);
                if(indice>0){
                    const productosAux = carrito.productos.splice(indice,1);
                    const data = await gestorCarrito.updateElemento(idCarrito,{username:req.session.passport.user.username,productos:productosAux});
                    return {status:"ok",code:200,message:`Se elimino el producto id ${idProducto}, del carrito con id ${idCarrito}`, carrito:data};
                }
                return {status:"error",message:'Producto no econtrado en el carrito', code:406};
            }
            return {status:"error",message:'Carrito no encontrado', code:406};
        }
        return {status:"error",code:404,message:`No se recibieron algunos de los datos necesarios`};
    }

}


