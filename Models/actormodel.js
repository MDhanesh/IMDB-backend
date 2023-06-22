const mongoose=require("mongoose")

const ActorModel=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true   
    },
    dob:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("actor",ActorModel)