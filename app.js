const express=require("express")
const app=express()
const bodyparser=require("body-parser")
const cors=require("cors")
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(bodyparser.json())
app.use(cors())

const ActorController=require("./Controllers/actorcontroller")
const MovieController=require("./Controllers/moviecontroller")
const ProducerController=require("./Controllers/producercontroller")
const UserController=require("./Controllers/usercontroller")

app.use("/",ActorController)
app.use("/",MovieController)
app.use("/",ProducerController)
app.use("/",UserController)




module.exports=app