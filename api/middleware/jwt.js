import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = async (req, res, next) => {
  const token= req.cookies.accessToken;
  if(!token) next(createError(401,"you are not authenticated !!"))
  jwt.verify(token,process.env.JWT_KEY, async (err,payload) => {
    if(payload.id != user._id.toString()){
     if (err) return next(createError(403,"Token isn't valid !!"))
      req.userId === payload.id;
      req.isSeller === payload.isSeller;
    }
  })
};