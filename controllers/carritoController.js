const carritoDAO = require("../dao/carritoDAOMongoDb");
const gestorCarrito = new carritoDAO();
module.exports = class CarritoController{

    static async obtenerCarritoDeUnUsuario(username){
     
        if(username){
            const carritoDelUsuario = (await gestorCarrito.getAllElementos()).filter(carrito => carrito.username === username).shift();
            if(carritoDelUsuario){
                
                return {status:"ok",code:200,message:`Solicitud procesada exitosamente`, carrito:carritoDelUsuario};
            }
            return {status:"ok",code:204,message:`Sin contenido`,carrito:{productos:[]}};
        }
        return {status:"error",code:404,message:`No se recibieron algunos de los datos necesarios para obtener el carrito`};
    }
    static async agregarProductoAlCarrito(username, producto){
        let data;
        if(username && producto){
            const carritoDelUsuario = (await gestorCarrito.getAllElementos()).filter(c => c.username === username).shift();
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
            data = data.filter(c => c.username === username);

            return {status:"ok",code:200,message:`Se agrego producto al carrito`, carrito:data.shift()};
        }

        return {status:"error",code:404,message:`No se recibieron algunos de los datos necesarios para el alta`};
    }

    static async borrarCarritoPorId(id){

        if(id){
            const data =  await gestorCarrito.deleteElementoById(id);
            if(data && data.length>0){
                return {status:"ok",code:200,message:`Se elimino el carrito con id ${id}`, carrito:data.shift()};
            }
            return {status:"error",message:'Carrito no encontrado', code:406};
        }
        return {status:"error",code:404,message:`No se recibieron algunos de los datos necesarios`};
    }

    static async obtenerProductosDeUnCarrito(id){
        if(id){
            const data =  await gestorCarrito.getElementoById(id);
            if(data){
                return {status:"ok",code:200,message:`Solicitud procesada exitosamente`, carrito:data.shift()};
            }
            return {status:"error",message:'Carrito no encontrado', code:406};
        }
        return {status:"error",code:404,message:`No se recibieron algunos de los datos necesarios`};
    }

    static async actualizarProductosDeUnCarrito(id, objeto){
        if(id && objeto){
            const data = (await gestorCarrito.updateElemento(id, objeto)).filter(c => c.username === objeto.username);
            if(data && data.length>0){
                return {status:"ok",code:200,message:`Se actualizo el carrito con id ${id}`, carrito:data.shift()};
            }
            return {status:"error",message:'Carrito no encontrado', code:406};
        }
        return {status:"error",code:404,message:`No se recibieron algunos de los datos necesarios`};
    }
    static async borraUnProductoDeUnCarrito(idCarrito, idProducto, username){

        if(idCarrito && idProducto && username){
            const carrito = await gestorCarrito.getElementoById(idCarrito);
            if(carrito){
                const productosAux = carrito.productos.filter(p=> p.id !== idProducto);
                const data = (await gestorCarrito.updateElemento(idCarrito,{username:username,productos:productosAux})).filter(c => c.username === username);
                    
                return {status:"ok",code:200,message:`Se elimino el producto id ${idProducto}, del carrito con id ${idCarrito}`, carrito:data.shift()};
            }
            return {status:"error",message:'Carrito no encontrado', code:406};
        }
        return {status:"error",code:404,message:`No se recibieron algunos de los datos necesarios`};
    }

}


