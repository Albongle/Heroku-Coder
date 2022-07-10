const ProductoMapper = require("../mapper/Producto.Mapper");
const CustomError = require("../model/Error.Model");
const Producto = require("../model/Producto.Model");
module.exports = class ProductoRepository{

    static getAllProductosFaker(){
        return Producto.getListaDeProductosFaker().map(p=>ProductoMapper.obtenerDTO(p));
    }
    static getAllProductos(){
        throw new CustomError("Sin implementacion");
    
    }
    static addProductos(_producto){
        throw new CustomError("Sin implementacion");
    }

    static getProductoById(_id){
        throw new CustomError("Sin implementacion");
    }
    
    static updateProducto(_id,_producto){
        throw new CustomError("Sin implementacion");
    }
    
    static deleteProductoById(_id){
        throw new CustomError("Sin implementacion");
    }

}