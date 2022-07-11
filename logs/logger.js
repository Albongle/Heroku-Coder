import logger from "log4js";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

logger.configure({
    appenders:{
        miLoggerConsola:{type:"console"},
        miLoggerWarn:{type:"file",filename:path.join(__dirname,"Warn.log")},
        miLoggerError:{type:"file",filename:path.join(__dirname,"Error.log")}

    },
    categories:{
      default:{appenders:["miLoggerConsola"], level:"info"},
      warn:{appenders:["miLoggerWarn"], level:"warn"},
      error:{appenders:["miLoggerError"], level:"error"},
    }
})




export default logger;



