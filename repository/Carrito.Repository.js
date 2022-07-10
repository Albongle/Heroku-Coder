const CarritoDAOMongo = require("../dao/mongo/CarritoMongo.DAO");
const gestorCarrito = new CarritoDAOMongo();
const CarritoMapper = require("../mapper/Carrito.Mapper");
const ProductoMapper = require("../mapper/Producto.Mapper");
const UsuarioMapper = require("../mapper/Usuario.Mapper");

module.exports = class CarritoRespository{
    static async getCarrito(usuario){
        const usuarioBo = UsuarioMapper.obtenerBO(usuario);
        const carritoBd = (await gestorCarrito.getElementoBy({username:usuario.username})).shift();
        let carritoBo = null;
        if(carritoBd){
            const prodcutosBo = carritoBd.productos.map(p=>ProductoMapper.obtenerBO(p));
            carritoBo = CarritoMapper.obtenerBO({usuario:usuarioBo,productos: prodcutosBo});

        }else{
            carritoBo = CarritoMapper.obtenerBO({usuario:usuarioBo,productos: new Array()});
        }
        return CarritoMapper.obtenerDTO(carritoBo);
    }

    static async addProducto(usuario,producto){
        const productoBo = ProductoMapper.obtenerBO(producto);
        const carritoBo = CarritoMapper.obtenerBO(await CarritoRespository.getCarrito(usuario)).agregarProductoAlCarrito(productoBo);
        const carritoBd = (await gestorCarrito.getElementoBy({username:usuario.username})).shift();
        await gestorCarrito.updateElementoById(carritoBd._id,CarritoMapper.obtenerDTO(carritoBo));
        return CarritoMapper.obtenerDTO(carritoBo);
    }

    static async deleteProducto(usuario,producto){

        const productoBo = ProductoMapper.obtenerBO(producto);
        const carritoBo = CarritoMapper.obtenerBO(await CarritoRespository.getCarrito(usuario)).borrarProductoDeUnCarrito(productoBo);
        const carritoBd = (await gestorCarrito.getElementoBy({username:usuario.username})).shift();
        await gestorCarrito.updateElementoById(carritoBd._id,CarritoMapper.obtenerDTO(carritoBo));
        return CarritoMapper.obtenerDTO(carritoBo);
    }

    static async deleteCarrito(usuario){
        const carritoBo = await CarritoMapper.obtenerBO(await CarritoRespository.getCarrito(usuario)).procesarCompraDelCarrito();
        const carritoBd = (await gestorCarrito.getElementoBy({username:usuario.username})).shift();
        await gestorCarrito.updateElementoById(carritoBd._id,CarritoMapper.obtenerDTO(carritoBo));
        return carritoBo.productos.length  === 0 ? true : false;
    }



}