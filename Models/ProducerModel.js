const mongoose=require("mongoose")

const producermodel=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    label:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        required:true
    },
    img:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
    }
})

module.exports=mongoose.model("producer",producermodel)