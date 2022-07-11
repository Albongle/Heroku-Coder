import {enviarCorreoElectronico }from "../modules/nodemailer/nodemailer.js";
import {CustomError} from "./Error.Model.js";

export class Usuario{

    #username;
    #password;
    #nombre;
    #edad;
    #direccion;
    #img;
    #codNacion;
    #codArea;
    #numTelefono;
    #telefono;
    constructor(datos){
        this.#setUsername(datos.username);
        this.#setPassword(datos.password);
        this.#setNombre(datos.nombre);
        this.#setEdad(datos.edad);
        this.#setDireccion(datos.direccion);
        this.#setImg(datos.img);
        this.#setTelefono(datos.codNacion,datos.codArea,datos.numTelefono);
    }

    get username(){
        return this.#username;
    }
    get password(){
        return this.#password;
    }
    get edad(){
        return this.#edad;
    }
    get nombre(){
        return this.#nombre;
    }
    get direccion(){
        return this.#direccion;
    }
    get img(){
        return this.#img;
    }
    get codArea(){
        return this.#codArea;
    }
    get codNacion(){
        return this.#codNacion;
    }
    get numTelefono(){
        return this.#numTelefono;
    }
    get telefono(){
        return this.#telefono;
    }

    #setUsername(value){
        if(value){
            this.#username = value;
        }
        else{
            throw new CustomError("No se recibio el username");
        }
    }
    #setPassword(value){
        if(value){
            
            this.#password = value;
        }
        else{
            throw new CustomError("No se recibio el password");
        }
        
    }
    #setEdad(value){
        if(value){
            this.#edad = value;
        }
        else{
            throw new CustomError("No se recibio la edad");
        }
    }  
    #setNombre(value){
        if(value){
            this.#nombre = value;
        }
        else{
            throw new CustomError("No se recibio el nombre");
        }   
    }
    #setDireccion(value){
        if(value){
            this.#direccion= value;
        }
        else{
            throw new CustomError("No se recibio la direccion");
        }
            
    }
    #setImg(value){
        if(value){
            this.#img=value;
        }
        else{
            throw new CustomError("No se recibiio la imagen del usuario");
        }
    }

    #setTelefono(codNacion, codArea, numTelefono){

        if(codNacion && codArea && numTelefono){
            this.#codNacion = codNacion;
            this.#codArea = codArea;
            this.#numTelefono = numTelefono;
            this.#telefono = codNacion+"9"+codArea+numTelefono;
        }else{
            throw new CustomError("No se recibieron algunos de los parametros necesarios para la creacion del telefono");
        }
    }


    #getPlantillaDeBienvenida(){
        return `<section style="background-color: blanchedalmond;">
        <h1>Bienvenido ${this.#nombre}</h1><br>
        <p>Usted se ha dado de alta de forma exitosa en la app de Alejandro Bongioanni</p><br>
        <ul>
            <li>Usuario: ${this.#username}</li>
            <li>Nombre: ${this.#nombre}</li>
            <li>Edad: ${this.#edad}</li>
            <li>Direccion: ${this.#direccion}</li>
            <li>Telefono: ${this.#telefono}</li>
        </ul>
        </section>`;
    }

    async notificarAlta(){
        await enviarCorreoElectronico(this.username, `Bienvenido ${this.nombre}`,this.#getPlantillaDeBienvenida());
    }

    

}