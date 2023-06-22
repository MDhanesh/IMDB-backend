const express=require("express")
const router=express.Router()
const moviemodel=require("../Models/moviemodel")
const actormodel=require("../Models/actormodel")
const authverify=require("../middleware/auth")
const userverify=require("../middleware/user")

router.post("/addmovie",authverify,async(req,res)=>{
    if(Array.isArray(req.body.cast)){
        var xyz=req.body.cast
    }else{
        var xyz=req.body.cast.split(",")
    }
    
    try {
        const newMovie=new moviemodel({
            name:req.body.name,
            director:req.body.director,
            year:req.body.year,
            genre:req.body.genre,
            poster:req.body.poster,
            cast:xyz,
            producer:req.body.producer,
            synopsis:req.body.synopsis
        })
        await newMovie.save()
        res.status(200).json({message:"created"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.get("/movies",authverify,userverify,async(req,res)=>{
    try {
        const result=await moviemodel.find()
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.get("/movie/:id",authverify,async(req,res)=>{
    try {
        const result=await moviemodel.findOne({_id:req.params.id})
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.put("/editmovie/:id",authverify,async(req,res)=>{
    try {
        const result = await moviemodel.findOneAndUpdate({_id:req.params.id},{$set:req.body})
        res.status(200).json({message:'updated'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.get("/filtermovie/:id",authverify,async(req,res)=>{
    try {
        const actor =await actormodel.findOne({_id:req.params.id})
        const result=await moviemodel.find({cast:{
            $in:actor.name
        }})
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

module.exports=router