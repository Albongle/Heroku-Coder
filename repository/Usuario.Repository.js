const UsuariosDAOMongo = require("../dao/mongo/UsuarioMongo.DAO");
const gestorUsuario = new UsuariosDAOMongo();
const UsuarioMapper = require("../mapper/Usuario.Mapper");

module.exports = class UsuarioRespository{



    static async addUsuarios(usuario){

        const userBo = UsuarioMapper.obtenerBO(usuario);
        const userDto = UsuarioMapper.obtenerDTO(userBo);
        await gestorUsuario.addElementos(userDto);
        userBo.notificarAlta();
        return userBo;
    }

    static async  getUsuarioByUsername(username){
        const usuario = (await gestorUsuario.getAllElementos()).find(u=>u.username === username);
        const usuarioBo = UsuarioMapper.obtenerBO(usuario);
        return UsuarioMapper.obtenerDTO(usuarioBo);
    }
    
}