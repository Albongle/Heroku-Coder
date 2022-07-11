import {faker} from "@faker-js/faker";
import {CustomError} from "./Error.Model.js";


export class Producto{

    #id;
    #urlImg;
    #desc;
    #nombre;
    #marca;
    #gama;
    #tipo;
    #precio;
    #cuotas;
    #cantidad;
    constructor (datos){
        this.#setId(datos.id);
        this.#setUrlImg(datos.urlImg);
        this.#setDesc(datos.desc);
        this.#setNombre(datos.nombre);
        this.#setMarca(datos.marca);
        this.#setGama(datos.gama);
        this.#setTipo(datos.tipo);
        this.#setPrecio(datos.precio);
        this.#setCuotas(datos.cuotas);  
        this.#setCantidad(datos.cantidad);      
    }

    get id(){
        return this.#id;
    }
    get urlImg(){
        return this.#urlImg;
    }
    get desc(){
        return this.#desc;
    }
    get nombre(){
        return this.#nombre;
    }
    get marca(){
        return this.#marca;
    }
    get gama(){
        return this.#gama;
    }
    get tipo(){
        return this.#tipo;
    }
    get precio(){
        return this.#precio;
    }
    get cuotas(){
        return this.#cuotas;
    }
    get cantidad (){
        return this.#cantidad;
    }

    #setId(value){
        if(value){
            this.#id = value;
        }
        else{
            throw new CustomError("No se recibio el Id para el alta del producto");
        }
    }
    #setUrlImg(value){
        if(value){
            this.#urlImg = value;
        }
        else{
            throw new CustomError("No se recibio la imagen para el alta del producto");
        }
    }
    #setDesc(value){
        if(value){
            this.#desc = value;
        }
        else{
            throw new CustomError("No se recibio la descripcion para el alta del producto");
        }
    }
    #setNombre(value){
        if(value){
            this.#nombre = value;
        }
        else{
            throw new CustomError("No se recibio el nombre para el alta del producto");
        }
    }
    #setMarca(value){
        if(value){
            this.#marca = value;
        }
        else{
            throw new CustomError("No se recibio la marca para el alta del producto");
        }
    }

    #setGama(value){
        if(value){
            this.#gama = value;
        }
        else{
            throw new CustomError("No se recibio la gama para el alta del producto");
        }
    }
    #setTipo(value){
        if(value){
            this.#tipo = value;
        }
        else{
            throw new CustomError("No se recibio el tipo para el alta del producto");
        }
    }
    #setPrecio(value){
        if(value){
            this.#precio = value;
        }
        else{
            throw new CustomError("No se recibio el precio para el alta del producto");
        }
    }
    #setCuotas(value){
        if(value){
            this.#cuotas = value;
        }
        else{
            throw new CustomError("No se recibio las cuotas para el alta del producto");
        }
    }
    #setCantidad(value){
        if(value){
            this.#cantidad = value;
        }
        else{
            throw new CustomError("No se recibio la cantidad para el alta del producto");
        }
    }

     static getListaDeProductosFaker(cantidad=10){
        const productosFaker = new Array();
        for (let index = 0; index < cantidad; index++) {
            const producto = new Producto({
                id:faker.random.alphaNumeric(5),
                urlImg: faker.image.image(),
                desc: faker.lorem.lines(),
                nombre: faker.commerce.productName(),
                marca: faker.commerce.productDescription(),
                gama: faker.commerce.productMaterial(),
                tipo: faker.commerce.product(),
                stock:  faker.finance.amount(1,20,0),
                precio: faker.finance.amount(10000,78000,2,"$"),
                cuotas: faker.finance.amount(3,12,0),
                cantidad:faker.finance.amount(1,2,0),
            });
            
            productosFaker.push(producto);
        }
        return productosFaker;
    }
}