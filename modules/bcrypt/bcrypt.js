const bcrypt = require("bcrypt");

function esPassWordValido(usuario, password){
    return bcrypt.compareSync(password,usuario.password);
}

function encriptarPassword(usuario){
    return bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10,null));
}

module.exports = {esPassWordValido, encriptarPassword};