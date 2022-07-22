import { GestorMemory } from "../../contenedores/Gestor.Memory.js";
import { Producto } from "../../model/Producto.Model.js";

export class ProductoDAOMemory extends GestorMemory {
    constructor(){
        super("productos", Producto.getListaDeProductosFaker());
    }

}