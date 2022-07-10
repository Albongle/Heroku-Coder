const ProductoMapper = require("../mapper/Producto.Mapper");
const CustomError = require("../model/Error.Model");
const Producto = require("../model/Producto.Model");
module.exports = class ProductoRepository{

    static getAllProductosFaker(){
        return Producto.getListaDeProductosFaker().map(p=>ProductoMapper.obtenerDTO(p));
    }

}