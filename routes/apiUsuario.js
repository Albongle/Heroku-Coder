const express = require("express");
const router = express.Router();
const session= require("express-session");
const cookieParse = require("cookie-parser");
const MongoStore = require("connect-mongo");
const passport = require("../modules/passport/passport");
const mdw = require("../middlewares/middlewares");
const upload = require("../modules/multer/multer"); //importo multer para agregarlo como mdw en el endpoint




//middlewares
//agreggo mdw de passport
router.use(cookieParse());
router.use(session({
    store:MongoStore.create({mongoUrl:process.env.STRING_CONNECTION, mongoOptions:{useNewUrlParser:true, useUnifiedTopology:true}}),
    secret:"shhhhhhhhhhhhhhhhhhhhhh",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:600000
    }
}));
router.use(passport.initialize());
router.use(passport.session());

//routes
router.get("/",mdw.validarSession,(req, res)=>{
    res.status(200).render("pages/home",{usuario:req.user.username, foto:req.user.img});
});

router.get("/login",(_req, res)=>{
    res.render("pages/login");
}); 
router.get("/failLogin",(_req, res)=>{
    res.status(200).render("pages/login",{error:"Usuario o Contraseña invalidos"});
}); 
router.get("/failAlta",(_req, res)=>{
    res.status(200).render("pages/registrar",{error:"Usuario ya existente"});
}); 
router.post("/login",passport.authenticate("login",{failureRedirect:"/failLogin", successRedirect:"/"}));

router.post("/alta",upload.single("archivo"),passport.authenticate("alta",{failureRedirect:"/failAlta", successRedirect:"/"}));

router.get("/alta",(_req, res)=>{

    res.status(200).render("pages/registrar");

});
router.post("/logout",mdw.validarSession,(req, res)=>{

    req.logOut();
    res.status(200).redirect("/");
});


module.exports = router;