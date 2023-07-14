import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoute from './routes/auth.route.js'
// import authRoute from './routes/auth.route.js'


const app = express();
dotenv.config();


const connect = async() =>{
  try {
  
  await mongoose.connect(process.env.MONGO)

  console.log("connected to mongo db ")
  } catch(error){
    console.log(error)
  }
}

// middle ware 
app.use(cors({origin:"http://localhost:5173", credentials:true}));
app.use(express.json())
app.use(cookieParser())



// routes
app.use("/api/auth",authRoute)
// app.use("/api/users",userRoute)



app.use((err,req,res,next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";

  return res.status(errorStatus).send(errorMessage)
})

app.listen(8000,() => {
  connect()
  console.log("backend server  is running")
})

