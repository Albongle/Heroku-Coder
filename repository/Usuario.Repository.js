import {UsuarioFactory} from "../factory/Usuario.Factory.js";
import {UsuarioMapper} from "../mapper/Usuario.Mapper.js";
const gestorUsuario = UsuarioFactory.getManagerUsuario();
export class UsuarioRespository{



    static async addUsuarios(usuario){

        const userBo = UsuarioMapper.obtenerBO(usuario);
        const userDto = UsuarioMapper.obtenerDTO(userBo);
        await gestorUsuario.addElementos(userDto);
        await userBo.notificarAlta();
        return userDto;
    }

    static async  getUsuarioByUsername(username){

        const usuario = (await gestorUsuario.getAllElementos()).find(u=>u.username == username);  
        const usuarioBo = UsuarioMapper.obtenerBO(usuario);
        return UsuarioMapper.obtenerDTO(usuarioBo);
    }
    
}