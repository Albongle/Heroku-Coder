const Carrito = require("../model/Carrito.Model");
const ProductoMapper = require("./Producto.Mapper");
const UsuarioMapper = require("./Usuario.Mapper");

module.exports = class CarritoMapper {
    static obtenerDTO(carrito){
        return{
            usuario:UsuarioMapper.obtenerDTO(carrito.usuario),
            productos:carrito.productos.map(p=> ProductoMapper.obtenerDTO(p))
        }
    }

    static obtenerBO(carritoDto){
        return new Carrito(carritoDto);
    }
}