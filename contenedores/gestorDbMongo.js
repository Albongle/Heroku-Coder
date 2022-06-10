const mongoose = require("mongoose");
module.exports = class GestorDbMongo{

    #coleccion;
    #esquema;
    #modelo;
    #cadenaConexion;
    constructor(cadenaConexion,coleccion,esquema){
        this.#cadenaConexion = cadenaConexion;
        this.#coleccion = coleccion;
        this.#esquema= new mongoose.Schema(esquema);
        this.#modelo= mongoose.model(this.#coleccion,this.#esquema);
    }

    async #setConexion(){
        try{
            await mongoose.connect(this.#cadenaConexion);
            console.log(`conexion a mongo establecida`);
        }
        catch(error){
            console.error(error);
        }

    }

    async addElementos(elementos){
        try{
            this.#setConexion();
            const respuesta = await this.#modelo.insertMany(elementos);
            console.log(`Se agregaron los elementos`);
            return respuesta;
        }
        catch(error){
            console.error(`${error}`);
        }
    }

    async getAllElementos()
    {

        try{
            this.#setConexion();
            const respuesta = await this.#modelo.find();
            return respuesta;
        }
        catch(error){
            console.error(`${error}`);
        }
    }

    async getElementoById(id){
        try{
            this.#setConexion();
            const respuesta = await this.#modelo.findById(id);
            return respuesta;
        }
        catch(error){
            console.error(`${error}`);
        }

    }
    async updateElemento(id,objeto)
    {
        try{
            this.#setConexion();
            await this.#modelo.findByIdAndUpdate(id,objeto);
            return true;

        }
        catch(error){
            console.error(`${error}`);
        }
        return false;

    }
    async deleteElementoById(id)
    {
        try{
            this.#setConexion();
            await this.#modelo.findByIdAndDelete(id);
            return true;
        }
        catch(error){
            console.error(`${error}`);
        }
        return false;
    }

}

