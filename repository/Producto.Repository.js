import { ProductoFactory } from "../factory/Producto.Factory.js";
import {ProductoMapper} from "../mapper/Producto.Mapper.js";
const gestorProducto = ProductoFactory.getManagerProducto();

export class ProductoRepository{

    static getAllProductosFaker(){
        return gestorProducto.getAllElementos().map(p=>ProductoMapper.obtenerDTO(p));
    }

    static addProductos(producto){
        const productoBo = ProductoMapper.obtenerBO(producto);
        return gestorProducto.addElementos(ProductoMapper.obtenerDTO(productoBo));
    }

    static updateProductos(producto){
        const productoBo = ProductoMapper.obtenerBO(producto);
        return gestorProducto.updateElementoById(productoBo.id,ProductoMapper.obtenerDTO(productoBo));
    }

    static deleteProductos(id){

        return gestorProducto.deleteElementoById(id);
    }

}