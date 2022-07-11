import logger from "../logs/logger.js";
import {CustomError} from "../model/Error.Model.js";

export class GestorArchivo{
    static #fs= require('fs');
    static #idObjeto = 0;
    #file;

    constructor(file){
        this.#file = file;
    }
    async addElementos(object){
        if(object!= undefined){
            try{
                const datosArchivo = await this.getAllElementos();
                if(datosArchivo.length>0){
                    GestorArchivo.#idObjeto =  datosArchivo.reduce((acum,proximo)=> acum>proximo.id? acum:proximo.id,0);
                }
                GestorArchivo.#idObjeto++;
                object.id = GestorArchivo.#idObjeto;
                datosArchivo.push(object); 
                
                await GestorArchivo.#fs.promises.writeFile(this.#file,JSON.stringify(datosArchivo),"utf-8");
                return Promise.resolve(await this.getAllElementos());
            }
            catch(error){
                logger.getLogger("error").error(error);
                
                throw new CustomError(`error en el metodo save ${error.message}`);
            }
        }else{
            Promise.reject(new CustomError(`No se recibio el objeto correspondiente`));
        }   
    }

    async getAllElementos(){
        try{
            if(!GestorArchivo.#fs.existsSync(this.#file)){
                await GestorArchivo.#fs.promises.writeFile(this.#file,"","utf-8");
            }
            const contenido = await GestorArchivo.#fs.promises.readFile(this.#file,"utf-8");
            return Promise.resolve(contenido.length>0 ? JSON.parse(contenido):[]);
        }
        catch(error){
            logger.getLogger("error").error(error);
            throw new CustomError(`error en el metodo getAll ${error.message}`);
        }
    }
    async getElementoById(id){
        try{
            if(id!==undefined && typeof(id) === "number"){
                const datosArchivo = await this.getAllElementos();
                const obj = datosArchivo.find(element => element.id === id);
                return obj===undefined ? Promise.reject(Error("El ID buscado no existe")) : Promise.resolve(obj);
            }else{
                throw new CustomError("Tipo de ID invalido");
            }
        }
        catch(error){
            logger.getLogger("error").error(error);
            throw new CustomError(`error en el metodo getById ${error.message}`);
        }
    }

    async deleteElementoById(id){
        try{
            if(id!==undefined && typeof(id) === "number"){
                const datosArchivo = await this.getAllElementos();
                let indice = datosArchivo.findIndex(element=> element.id === id);
                if(indice>-1){
                    datosArchivo.splice(indice,1);
                    await GestorArchivo.#fs.promises.writeFile(this.#file,JSON.stringify(datosArchivo), "utf-8");
                    return Promise.resolve(await this.getAllElementos());
                }
                else{
                    return Promise.reject(new CustomError("Sin conincidencia para la eliminacion del elemento"));
                }                
            }else{
                throw new CustomError("Tipo de ID invalido");
            }
        }
        catch(error){
            logger.getLogger("error").error(error);
            throw new CustomError(`error en el metodo deleteById ${error.message}`);
        }
        
    }

    async deleteAll(){
        try{
            await GestorArchivo.#fs.promises.writeFile(this.#file,"", "utf-8");
            return Promise.resolve(await this.getAllElementos());
        }
        catch(error){
            logger.getLogger("error").error(error);
            throw new CustomError(`error en el metodo deleteAll ${error.message}`);
        }
    }
}