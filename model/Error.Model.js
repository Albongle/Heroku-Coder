module.exports = class CustomError extends Error{
    constructor (mensaje,estado) {
        super(mensaje);
        this.estado = estado;
    }
}