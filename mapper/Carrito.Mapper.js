import {Carrito} from "../model/Carrito.Model.js";
import  {ProductoMapper} from "./Producto.Mapper.js";
import  {UsuarioMapper} from "./Usuario.Mapper.js";

export class CarritoMapper {
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