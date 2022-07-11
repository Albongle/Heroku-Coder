import bcrypt from "bcrypt";

function esPassWordValido(password,passwordEncriptado){
    return bcrypt.compareSync(password,passwordEncriptado);
}

function encriptarPassword(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10,null));
}

export {esPassWordValido, encriptarPassword};