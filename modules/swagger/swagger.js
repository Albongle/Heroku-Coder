import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Express Api with swagger",
            description:" A simple CRUD API appication made with Express and documented with Swagger",
        },
    },
    apis:[path.join(__dirname,"**","*.yaml")],

};

const especifications = swaggerJsDoc(options);

export default {serve:swaggerUi.serve,setup:swaggerUi.setup(especifications)};