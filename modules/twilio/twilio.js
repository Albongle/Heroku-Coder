const twilio = require("twilio");
const logger = require("../../logs/logger");


const cliente = twilio(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

async function enviarSms(){
    try{
        const mensaje = await cliente.messages.create({
            from: "+19785103201",
            to: "+5491134925771",
            body: `Este es un mensaje de prueba desde Node`

        });
        logger.getLogger().info(`mensaje enviado ${mensaje}}`);
    }
    catch(error){
        logger.getLogger("error").error(`error a enviar un sms ${error}`);
    }

}

module.exports = enviarSms;