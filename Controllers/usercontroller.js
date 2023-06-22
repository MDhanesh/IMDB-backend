const express=require("express")
const router=express.Router()
const usermodel=require("../Models/usermodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const secret="imdb"
const Authverify=require("../middleware/auth")
const Userverify=require("../middleware/user")
const nodemailer=require("nodemailer")


router.post("/adduser",async(req,res)=>{
    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(req.body.password,salt)
    req.body.password=hash
    try {
        const newUser=new usermodel({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})


//login

router.post("/signin",async(req,res)=>{
    try {
        const user=await usermodel.findOne({email:req.body.email})
        if(user){
            const compare= await bcrypt.compare(req.body.password,user.password)
            if(compare){
                const token=jwt.sign({_id:user._id},secret,{expiresIn:"30d"})
                res.status(200).json({user,token})
            }else{
                res.status(400).json({message:"Incorrect username/password"})
            }
        }else{
            res.status(400).json({message:"no user found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})


router.get("/user",Authverify,Userverify,(req,res)=>{
    id=req.Uniqueid
    usermodel.findOne({_id:id}).then((result)=>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(400).json({message:"no user found"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    })
})


router.post("/forgot", async (req, res) => {
    const user = await usermodel.findOne({ email: req.body.email });
    if (user) {
      const forgotSec = secret + user.password;
      const token = jwt.sign({ email: user.email, id: user._id }, forgotSec, {
        expiresIn: "10m",
      });
      const link = `https://imdbwebapi.onrender.com/reset/${user._id}/${token}`;
    //   console.log(link)
      if (link) {
        const sender = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "bbaa64903@gmail.com",
            pass: "ejzisgonigwvvzko",
          },
        });
  
        const composemail = {
          from: "bbaa64903@gmail.com",
          to: user.email,
          subject: "for changing the password",
          html: link,
        };
  
        sender.sendMail(composemail, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("sent");
          }
        });
      }
    } else {
      res.status(400).json({ message: "user not found" });
    }
  });


  router.get("/reset/:id/:token", async (req, res) => {
    const user = await usermodel.findOne({ _id: req.params.id });
    if (user) {
      const forgotSec = secret + user.password;
  
      try {
        const verify = jwt.verify(req.params.token, forgotSec);
        res.render("index", { email: verify.email, status: "not verified" });
      } catch (error) {
        res.json(error);
      }
    } else {
      res.status(400).json({ message: "user not exists" });
    }
  });
  
  router.post("/reset/:id/:token", async (req, res) => {
    const user = await usermodel.findOne({ _id: req.params.id });
    if (user) {
      const forgotSec = secret + user.password;
  
      try {
        const verify = jwt.verify(req.params.token, forgotSec);
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        const user = await usermodel.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              password: req.body.password,
            },
          }
        );
        res.render("home");
      } catch (error) {
        res.json({ message: "something went wrong" });
        console.log(error);
      }
    } else {
      res.status(400).json({ message: "user not existss" });
    }
  });

module.exports=router