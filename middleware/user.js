const UserModel=require("../Models/usermodel")



module.exports=async(req,res,next)=>{
    if(req.Token._id){
        const user=await UserModel.findOne({_id:req.Token._id})
        if(user){
            req.Uniqueid=user._id
            next()
        }else{
            res.status(400).json({message:"no user found"})
        }
    }else{
        res.status(500).json({message:"Something went wrong"})
    }
}