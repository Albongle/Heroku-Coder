const InfoDelSistema = require("../model/InfoDelSitema.Model");

module.exports = class InfoController{

    static obtenerInformacionDelSistema(_req, res){
        const info = new InfoDelSistema();
        res.status(200).json({status:"ok", code:200, message:"Solicitud procesada con exito", informacionDelSistema: info.creaObjetoInfo()});
    }
}