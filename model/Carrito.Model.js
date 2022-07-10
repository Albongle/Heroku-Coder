const enviarCorreoElectronico = require("../modules/nodemailer/nodemailer");
const { enviarSms, enviarWhatsApp } = require("../modules/twilio/twilio");
const CustomError = require("./Error.Model");
module.exports = class Carrito{

    #usuario;
    #productos;
    constructor(datos){
        this.#setUsuario(datos.usuario);
        this.#setProductos(datos.productos);
    }

    get usuario (){
        return this.#usuario;
    }

    get productos(){
        return this.#productos;
    }

    #setUsuario(value){
        if(value){
            this.#usuario = value;
        }else{

            throw new CustomError("No se reicibio el usuario necesario para la creacion del carrito");
        }

    }
    #setProductos(value){
        if(value && Array.isArray(value)){
            this.#productos = value;
        }
        else{
            throw new CustomError("No se reicibio el usuario necesario para la creacion del carrito"); 
        }
    }
    #getProducto(id){
        return this.#productos.find(p=> p.id === id);
    }

    agregarProductoAlCarrito(producto){
        if(producto){
            const productoExistente = this.#getProducto(producto.id);
            if(productoExistente){
                productoExistente.cantidad++;
            }else{
                this.#productos.push(producto);
            }
        }
        return this;
    }
    
    borrarProductoDeUnCarrito(producto){
        if(producto){
            if(producto.cantidad-1 <=0){
                this.#productos = this.#productos.filter(p=> p.id !== producto.id);
            }else{
                this.#getProducto(producto.id).cantidad --;
            }
        }
        return this;
    }
    #borrarProductos(){
        this.#productos.splice(0,this.#productos.length);
        return this;
    }
    async procesarCompraDelCarrito(){

        await enviarCorreoElectronico(process.env.MAIL_ADMIN,`Nuevo Pedido de ${this.#usuario.nombre} - Email: ${this.#usuario.username}`,this.#generarPlantillaDeProductos());
        await enviarSms(this.#usuario.telefono, "Su pedido ha sido recidibo y se encuentra en proceso");
        await enviarWhatsApp(process.env.TELEFONO_ADMIN,`Nuevo Pedido de ${this.#usuario.nombre} - Email: ${this.#usuario.username}`);

        return this.#borrarProductos();
    }
    #generarPlantillaDeProductos(){
        let lista = "<ul>";
        for (const key in this.#productos) {
            lista+= `<li>Producto: ${this.#productos[key].nombre} - Cantidad: ${this.#productos[key].cantidad}</li>`;
        }

        lista+="</ul>";
        return lista;
    }
}