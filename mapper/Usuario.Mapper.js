const Usuario = require("../model/Usuario.Model")

module.exports = class UsuarioMapper {
    static obtenerDTO(usuario){
        return{
            username:usuario.username,
            password:usuario.password,
            nombre:usuario.nombre,
            edad:usuario.edad,
            direccion:usuario.direccion,
            img:usuario.img,
            codNacion:usuario.codNacion,
            codArea:usuario.codArea,
            numTelefono:usuario.numTelefono,
            telefono:usuario.telefono
        }
    }

    static obtenerBO(usuarioDto){
        return new Usuario(usuarioDto);
    }
}