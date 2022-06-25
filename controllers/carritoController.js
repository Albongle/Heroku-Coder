

async function agregarProdcutoAlCarrito(gestorCarrito,username, producto){
let respuesta;
const productosUsuario = (await gestorCarrito.getElementosByParams(username,"username")).shift();
    if(productosUsuario){
        const productoExistente = productosUsuario.productos.find(p=> p.id === producto.id);
        if(productoExistente){
            productoExistente.cantidad++;
        }
        else{
            productosUsuario.productos.push(producto);
        }
        respuesta =  await gestorCarrito.updateElemento(productosUsuario._id,productosUsuario);
    }
    else{
        respuesta = await gestorCarrito.addElementos({username:username,productos:producto});
    }
    return respuesta.shift();
}

module.exports = agregarProdcutoAlCarrito;