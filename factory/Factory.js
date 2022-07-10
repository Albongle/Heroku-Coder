const minimist = require("minimist");
const options= {default:{persistencia:"mongo"},alias:{ps:"persistencia"}};
const persistencia = minimist(process.argv,options).persistencia;

module.exports = class Factory {
    #persistencia
    constructor () {
        this.#persistencia = persistencia;
    }
    get persistencia(){
        return this.#persistencia;
    }

}