const passport = require("passport");
const {Strategy:localStrategy} = require("passport-local");
const UsuariosDAO = require("../dao/usuariosDAOMongoDb");
const gestorUsuario = new UsuariosDAO();


//config
//configuro passport, dentro obtiene los usuarios de la BD
passport.use("login", new localStrategy(async (username, password, done)=>{

    const usuarios = await gestorUsuario.getAllElementos();
    const usuario = usuarios.find(u=> u.usuario == username && u.password == password);
    if(usuario){
        return done(null, usuario);
    }
    return done(null,false);
}));

passport.use("alta", new localStrategy({ passReqToCallback: true },async (req,username, _password, done)=>{

    const usuarios = await gestorUsuario.getAllElementos();
    const usuarioAux = usuarios.find(u=> u.usuario == username);
    if(usuarioAux){
        return done(null,false);
    }
    const user=req.body.username;
    const pass=req.body.password;
    const usuario ={usuario:user, password:pass};
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