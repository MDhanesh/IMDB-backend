const express=require("express")
const router=express.Router()

const ActorModel=require("../Models/actormodel")
const actormodel = require("../Models/actormodel")
const authverify=require("../middleware/auth")

router.post("/addactor",authverify,async(req,res)=>{
    try {
        const newActor=new ActorModel({
            name:req.body.name,
            gender:req.body.gender,
            dob:req.body.dob,
            bio:req.body.bio,
            img:req.body.img
        })
        await newActor.save()
        res.status(200).json(newActor)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.get("/getactors",authverify,async(req,res)=>{
    try {
        const getActors=await ActorModel.find()
        res.status(200).json(getActors)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.get("/getactor/:id",authverify,async(req,res)=>{
    try {
        const result=await actormodel.findOne({_id:req.params.id})
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})


router.put("/editactor/:id",authverify,async(req,res)=>{
    try {
        const result=await actormodel.findOneAndUpdate({_id:req.params.id},{$set:req.body})
        res.status(200).json({message:"updated"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})




module.exports=router