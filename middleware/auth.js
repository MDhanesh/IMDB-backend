const jwt=require("jsonwebtoken")
const secret="imdb"

module.exports=(req,res,next)=>{
    if(req.headers.authorization){
        const verify=jwt.verify(req.headers.authorization,secret)
       req.Token=verify
       next()
    }else{
        res.status(500).json({message:"Auth failed"})
    }
}