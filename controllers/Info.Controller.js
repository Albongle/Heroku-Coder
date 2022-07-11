import {InfoDelSistema} from "../model/InfoDelSitema.Model.js";

export class InfoController{

    static obtenerInformacionDelSistema(_req, res){
        const info = new InfoDelSistema();
        res.status(200).json({status:"ok", code:200, message:"Solicitud procesada con exito", informacionDelSistema: info.creaObjetoInfo()});
    }
}