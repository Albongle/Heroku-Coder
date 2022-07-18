
export class ViewController{
    static renderizarHome(req,res){
        res.render("pages/home",{usuario:req.user.username, foto:req.user.img});
    }

    static renderizarLogin(_req,res){
        res.render("pages/login");
    }
    static renderizarRegistrar(_req,res){
        res.render("pages/registrar");
    }

}