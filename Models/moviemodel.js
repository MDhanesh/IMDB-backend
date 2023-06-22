const mongoose=require("mongoose")

const moviemodel=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        director:{
            type:String,
            required:true
        },
        year:{
            type:Number,
            required:true
        },
        genre:{
            type:String,
            required:true
        },
        poster:{
            type:String,
            required:true
        },
        cast:{
            type:Array,
            required:true
        },
        producer:{
            type:String,
            required:true
        },
        synopsis:{
            type:String,
            required:true
        }
    }
)

module.exports=mongoose.model("movie",moviemodel)