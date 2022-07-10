const CarritoFactory = require("../factory/Carrito.Factory");
const gestorCarrito = CarritoFactory.getManagerCarrito();
const CarritoMapper = require("../mapper/Carrito.Mapper");
const ProductoMapper = require("../mapper/Producto.Mapper");
const UsuarioMapper = require("../mapper/Usuario.Mapper");

module.exports = class CarritoRespository{
    static async getCarrito(usuario){
        const usuarioBo = UsuarioMapper.obtenerBO(usuario);
        const carritoBd = (await gestorCarrito.getAllElementos()).find(c=> c.usuario.username === usuario.username);
        if(carritoBd){
            const prodcutosBo = carritoBd.productos.map(p=>ProductoMapper.obtenerBO(p));
            const carritoBo = CarritoMapper.obtenerBO({usuario:usuarioBo,productos: prodcutosBo});
            return CarritoMapper.obtenerDTO(carritoBo);
        }
        const carritoDto = {usuario:UsuarioMapper.obtenerDTO(usuarioBo), productos:[]};  
        await gestorCarrito.addElementos(carritoDto);
        return carritoDto;
    }

    static async addProducto(usuario,producto){
        const productoBo = ProductoMapper.obtenerBO(producto);
        const carritoBo = CarritoMapper.obtenerBO(await CarritoRespository.getCarrito(usuario)).agregarProductoAlCarrito(productoBo);
        const carritoBd = (await gestorCarrito.getAllElementos()).find(c=> c.usuario.username === usuario.username);
        await gestorCarrito.updateElementoById(carritoBd._id,CarritoMapper.obtenerDTO(carritoBo));
        return CarritoMapper.obtenerDTO(carritoBo);
    }

    static async deleteProducto(usuario,producto){

        const productoBo = ProductoMapper.obtenerBO(producto);
        const carritoBo = CarritoMapper.obtenerBO(await CarritoRespository.getCarrito(usuario)).borrarProductoDeUnCarrito(productoBo);
        const carritoBd = (await gestorCarrito.getAllElementos()).find(c=> c.usuario.username === usuario.username);
        await gestorCarrito.updateElementoById(carritoBd._id,CarritoMapper.obtenerDTO(carritoBo));
        return CarritoMapper.obtenerDTO(carritoBo);
    }

    static async deleteCarrito(usuario){
        const carritoBo = await CarritoMapper.obtenerBO(await CarritoRespository.getCarrito(usuario)).procesarCompraDelCarrito();
        const carritoBd = (await gestorCarrito.getAllElementos()).find(c=> c.usuario.username === usuario.username);
        await gestorCarrito.updateElementoById(carritoBd._id,CarritoMapper.obtenerDTO(carritoBo));
        return carritoBo.productos.length  === 0 ? true : false;
    }



}