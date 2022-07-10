const Producto = require("../model/Producto.Model");

module.exports = class ProductoMapper {
    static obtenerDTO(producto){
        return{
            id:producto.id,
            urlImg:producto.urlImg,
            desc: producto.desc,
            nombre: producto.nombre,
            marca: producto.marca,
            gama: producto.gama,
            tipo: producto.tipo,
            stock: producto.stock,
            precio: producto.precio,
            cuotas: producto.cuotas,
            cantidad:producto.cantidad
        }
    }

    static obtenerBO(productoDto){
        return new Producto(productoDto);
    }
}