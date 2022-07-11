const UsuarioSchema = {

    username:{type:String, require:true, max:50}, 
    password:{type:String, require:true, max:50},
    img:{type:String, require:true, max:255},
    nombre:{type:String, require:true, max:50}, 
    direccion:{type:String, require:true, max:50},
    edad:{type:Number, require:true},
    codArea:{type:String, require:true, max:50},
    codNacion:{type:String, require:true, max:50},
    numTelefono:{type:String, require:true, max:50},
    telefono:{type:String, require:true, max:50},
  
}

export {UsuarioSchema};