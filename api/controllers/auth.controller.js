import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import createError from "../utils/createError.js"

export const register = async(req,res,next) => {
try {
   
    const takenUsername = await User.findOne({username:req.body.username})
    const takenEmail = await User.findOne({email:req.body.email})

    if(takenUsername || takenEmail ){
      return next(createError(409,"username or email has already been taken "))
    } else {
      const hash = bcrypt.hashSync(req.body.password,5)
      const newUser = new User({
        ...req.body,
        password:hash
      })
      await newUser.save();
      next(createError(201,"user has been created"))
    }
} catch (err) {
  console.log(err)
}
}

export const login = async(req,res,next) => {
  try { 
    
      const user = await User.findOne({username:req.body.username})
      const err = new Error()
      err.status = 404
      err.message = "user not found !!"
      if(!user) return next(err)


      const isCorrect = bcrypt.compareSync(req.body.password,user.password)
      if(!isCorrect) return next(createError(400,"wrong password or username !!"))

      const token = jwt.sign({
        id:user._id,
        },
        process.env.JWT_KEY
      ) 

      const {password,...info} = user._doc
      res.cookie("accessToken",token,{
        httpOnly:true,
      }).status(200).send(info)
    

  } catch (err) {
     next(createError(500,"something went wrong !!"))
  } 
}

export const logout = async(req,res,next) => {
        res.clearCookie("accessToken",{
        sameSite:"none",
        secure:"true"
      })
      .next(createError(200,"user has been logged out !!"))
}