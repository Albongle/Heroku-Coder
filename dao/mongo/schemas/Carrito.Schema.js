const CarritoSchema = {
    username: {type:String, require:true,max:255},
    productos:{type:Array, require:true},
}

module.exports = CarritoSchema;