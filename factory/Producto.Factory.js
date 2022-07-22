import { ProductoDAOMemory } from "../dao/memory/ProductoMemory.DAO.js";


export class ProductoFactory{
    static #manager = null;
    constructor(){
        ProductoFactory.#manager = null;
    }

    static getManagerProducto(){
        if(ProductoFactory.#manager === null){
            ProductoFactory.#manager = new ProductoDAOMemory();
        }

        return ProductoFactory.#manager
    }
}