import {verify} from "jsonwebtoken"
import { userModel } from "../model/user/login.js";
const config = process.env;

export const auth= async(req, res, next) => {
    try {

  if (!req.headers.authorization) {
    return res.status(403).send("A token is required for authentication");
  }
    const token = req.headers.authorization.split(" ")[1];
    console.log('process.env.TOKEN_KEY :>> ', process.env.jwt_TOKEN_KEY);
   
    const accessToken = verify(token, process.env.jwt_TOKEN_KEY);
    console.log('accessToken :>> ', accessToken);
    const user = await userModel.findOne({_id:accessToken._id})
    req.user =user
    console.log('user :>> ', user);
    if(!user){
      return res.status(400)("user not found")
    }
      
    next();
  } catch (err) {
      console.log('err :>> ', err);
    return res.status(401).send("Invalid Token");
  }
};