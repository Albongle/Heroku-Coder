const console = require("console");
const passport = require("passport");
const {Strategy:localStrategy} = require("passport-local");

const UsuarioRespository = require("../../repository/Usuario.Repository");
const { esPassWordValido, encriptarPassword } = require("../bcrypt/bcrypt");



//config
//configuro passport, dentro obtiene los usuarios de la BD
passport.use("login", new localStrategy(async (username, password, done)=>{
    const usuario =  await UsuarioRespository.getUsuarioByUsername(username);
    if(usuario.username === username && esPassWordValido(password,usuario.password)){
        return done(null, usuario);
    }
    return done(null,false);
}));

passport.use("alta", new localStrategy({ passReqToCallback: true },async (req,_username, _password, done)=>{
    
    const nuevoUsuario = UsuarioRespository.addUsuarios({...req.body,imagen:req.file.filename});
    UsuarioRespository.addUsuarios({...req.body,password:encriptarPassword(req.body.password),imagen:req.file.filename})
    if(nuevoUsuario){
        return done(null,nuevoUsuario);

    }
    return done(null,false);
 }));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

module.exports= passport;