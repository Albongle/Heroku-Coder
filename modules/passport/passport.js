const passport = require("passport");
const {Strategy:localStrategy} = require("passport-local");
const UsuariosDAO = require("../../dao/usuariosDAOMongoDb");
const { encriptarPassword, esPassWordValido } = require("../bcrypt/bcrypt");
const enviarCorreoElectronico = require("../nodemailer/nodemailer");
const enviarSms = require("../twilio/twilio");
const gestorUsuario = new UsuariosDAO();



//config
//configuro passport, dentro obtiene los usuarios de la BD
passport.use("login", new localStrategy(async (username, password, done)=>{

    const usuarios = await gestorUsuario.getAllElementos();
    const usuario = usuarios.find(u=> u.username == username && esPassWordValido(u.password,password));
    if(usuario){
        return done(null, usuario);
    }
    enviarSms();
    return done(null,false);
}));

passport.use("alta", new localStrategy({ passReqToCallback: true },async (req,username, _password, done)=>{

    const usuarios = await gestorUsuario.getAllElementos();
    const usuarioAux = usuarios.find(u=> u.username == username);
    if(usuarioAux){
        return done(null,false);
    }
    const img = req.file.filename;
    const {username:email,password,edad,direccion, nombre, telefono} = req.body;
    const usuario ={username:email,password:encriptarPassword(password),edad,direccion,nombre,telefono, img};
    await gestorUsuario.addElementos(usuario);
    await enviarCorreoElectronico(username, `Bienvenido ${nombre}`, `<h1>Usted se ha dado de alta de forma exitosa en la app de Alejandro Bongioanni</h1>`);
    return done(null,usuario);
 }));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

module.exports= passport;