const twilio = require("twilio");
const logger = require("../../logs/logger");


const cliente = twilio(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

async function enviarSms(destinatario, mensaje){
    try{
        const respuesta = await cliente.messages.create({
            from: "+19785103201",
            to: destinatario,
            body: mensaje

        });
        logger.getLogger().info(`mensaje enviado ${respuesta}}`);
    }
    catch(error){
        logger.getLogger("error").error(`error a enviar un sms ${error}`);
    }

}

module.exports = enviarSms;