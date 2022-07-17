import {ProductoMapper} from "../mapper/Producto.Mapper.js";
import {Producto} from "../model/Producto.Model.js";
export class ProductoRepository{

    static getAllProductosFaker(){
        return Producto.getListaDeProductosFaker().map(p=>ProductoMapper.obtenerDTO(p));
    }

    static addProductos(producto){
        const productoBo = ProductoMapper.obtenerBO(producto);
        return ProductoMapper.obtenerDTO(productoBo);
    }

}