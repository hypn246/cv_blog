import express  from "express";
import router from "./router.js";
import mongoose from 'mongoose'
import cors from 'cors'
//middleware
const app=express();
app.use(express.json())

///for authority
app.use(cors({
    // credentials:true,
    // origin:'http://localhost:3000'
}))
app.use('/upload',express.static('upload/'))
///affix tag and router
app.use('/blog', router)

//read .env file var
let  PORT
let mongoDBURL

let url=process.env.DB_URL
if(url){
    PORT = process.env.PORT;
    let auth=url.split('username')
    let srv=auth[1].split('password')
    
    mongoDBURL=auth[0].concat(process.env.DB_USERNAME).concat(srv[0]).concat(process.env.DB_PASSWORD).concat(srv[1])
}else{
    //in docker-compose config
    mongoDBURL=process.env.MONGO_URL
    PORT = process.env.DB_PORT;
}
//////connect to database
mongoose
.connect(mongoDBURL)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`App listening on port ${PORT}`)
    })
    console.log("Database ok")
})
.catch((err)=>{
    console.log(err)
})