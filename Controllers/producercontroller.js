const express=require("express")
const router=express.Router()

const producermodel=require("../Models/ProducerModel")
const authverify=require("../middleware/auth")
const moviemodel=require("../Models/moviemodel")

router.post("/addproducer",authverify,async(req,res)=>{
    try {
        const newProducer=new producermodel({
            name:req.body.name,
            dob:req.body.dob,
            label:req.body.label,
            gender:req.body.gender,
            bio:req.body.bio,
            img:req.body.img
        })
        await newProducer.save()
        res.status(200).json({message:"created"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})


router.get("/getproducer",authverify,async(req,res)=>{
    try {
        const result=await producermodel.find()
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})


router.get("/getproducer/:id",authverify,async(req,res)=>{
    try {
        const result=await producermodel.findOne({_id:req.params.id})
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.put("/editproducer/:id",authverify,async(req,res)=>{
    try {
        const result=await producermodel.findOneAndUpdate({_id:req.params.id},{$set:req.body})
        res.status(200).json({message:"Updated"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.get("/filterproducermovie/:id",async(req,res)=>{
    try {
        const producer=await producermodel.findOne({_id:req.params.id})
        const movies=await moviemodel.find({producer:producer.name})
        res.status(200).json(movies)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

module.exports=router