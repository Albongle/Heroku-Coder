const GestorDbMongo = require("../../contenedores/GestorDB.Mongo");
const UsuarioSchema = require("./schemas/Usuario.Mongo.Schema");



module.exports = class UsuariosDAOMongo extends GestorDbMongo{

  constructor(){
      super(process.env.STRING_CONNECTION,"usuarios",UsuarioSchema);   
  }

  
}