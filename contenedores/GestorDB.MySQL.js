const knex = require("knex");
const logger = require("../logs/logger");
module.exports = class GestorDbMySql{

    #config;
    #database;
    #tabla;
    constructor(){
        this.#config = {
            client:"mysql",
            connection:
            {
              host:"127.0.0.1",
              user:"root",
              password:"",
              database:"coderhouse"
            },
            pool:{min:0, max:7}
          };
    }

    async crearTabla(nombre, columnas){
        try{
            this.#database=knex(this.#config);
            this.#tabla= nombre || "tabla_default";
            await this.#database.schema.dropTableIfExists(this.#tabla);
            await this.#database.schema.createTable(this.#tabla, table=>{
                table.increments();

                for (const key in columnas) {
                    switch(key)
                    {
                        case "strings":
                            columnas.strings.forEach(c=> c.length!= undefined ? table.string(c.name,parseInt(c.length)).notNullable() :table.string(c.name).notNullable());
                        break;
                        case "integers":
                            columnas.integers.forEach(c=> table.integer(c).notNullable());
                        break;
                        case "floats":
                            columnas.floats.forEach(c=> table.float(c).notNullable());
                        break;
                    }
                    
                }
            });
            logger.getLogger().info(`Tabla creada`);
        }
        catch(error){
            logger.getLogger("error").error(error);
        }
        finally{
            this.#database.destroy();
        }
    }

    async addElementos(elementos){
        try{
            this.#database=knex(this.#config);
            let res = await this.#database(this.#tabla).insert(elementos);
            logger.getLogger().info(`Se agregaron los elementos ${res}`);
            return res;
        }
        catch(error){
            logger.getLogger("error").error(error);
        }
        finally{
            this.#database.destroy();
        }

    }
    async getAllElementos()
    {
        try{
            this.#database=knex(this.#config);
            return await this.#database(this.#tabla);
        }
        catch(error){
            logger.getLogger("error").error(error);
        }
        finally{
            this.#database.destroy();
        }

    }
    async getElementoById(id)
    {
        try{
            this.#database=knex(this.#config);
            return await this.#database(this.#tabla).where("id",id);
        }
        catch(error){
            logger.getLogger("error").error(error);
        }
        finally{
            this.#database.destroy();
        }

    }
    async updateElemento(id,objeto)
    {
        try{
            this.#database=knex(this.#config);
            return await this.#database(this.#tabla).where("id",id).update(objeto);
        }
        catch(error){
            logger.getLogger("error").error(error);
        }
        finally{
            this.#database.destroy();
        }

    }
    async deleteElementoById(id)
    {
        try{
            this.#database=knex(this.#config);
            return await this.#database(this.#tabla).where("id",id).del();
        }
        catch(error){
            logger.getLogger("error").error(error);
        }
        finally{
            this.#database.destroy();
        }

    }
}