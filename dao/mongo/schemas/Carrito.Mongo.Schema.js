const CarritoSchema = {
    usuario: {type:Object, require:true},
    productos:{type:Array, require:true},
}

module.exports = CarritoSchema;