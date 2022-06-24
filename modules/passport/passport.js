const passport = require("passport");
const {Strategy:localStrategy} = require("passport-local");
const UsuariosDAO = require("../../dao/usuariosDAOMongoDb");
const { encriptarPassword, esPassWordValido } = require("../bcrypt/bcrypt");
const gestorUsuario = new UsuariosDAO();



//config
//configuro passport, dentro obtiene los usuarios de la BD
passport.use("login", new localStrategy(async (username, password, done)=>{

    const usuarios = await gestorUsuario.getAllElementos();
    const usuario = usuarios.find(u=> u.username == username && esPassWordValido(u,password));
    if(usuario){
        return done(null, usuario);
    }
    return done(null,false);
}));

passport.use("alta", new localStrategy({ passReqToCallback: true },async (req,username, _password, done)=>{

    const usuarios = await gestorUsuario.getAllElementos();
    const usuarioAux = usuarios.find(u=> u.username == username);
    if(usuarioAux){
        return done(null,false);
    }
    const img = req.file.filename;
    
    const usuario ={...req.body, img};
    const password = encriptarPassword(usuario);
    usuario.password = password;
    await gestorUsuario.addElementos(usuario);
    return done(null,usuario);
 }));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

module.exports= passport;