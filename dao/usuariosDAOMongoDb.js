const GestorDbMongo = require("../contenedores/gestorDbMongo");

const esquema = {

  usuario:{type:String, require:true, max:50}, 
  password:{type:String, require:true, max:50}, 
}

module.exports = class UsuariosDAOMongo extends GestorDbMongo{

    constructor(){
        super(process.env.STRING_CONNECTION,"usuarios",esquema);   
      }
}