const ChatSchema = {

    name:{type:String, require:true, max:50}, 
    user:{type:String, require:true, max:50}, 
    message:{type:String, require:true}
}

export {ChatSchema};