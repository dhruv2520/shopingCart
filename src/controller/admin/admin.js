import { userModel } from "../../model/user/login.js";
import jwt from "jsonwebtoken";

export class adminController {
  
static getAdmin = async (req, res) => {
    const body = req.body
    try {
        const data = await userModel.find()
        if (data) res.status(200).send({ Message: "user Successfully Get", user: data })
        else return res.status(400).send({ Message: "Get user Error In Database" })
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" })
    }
}
// login

static loginAdmin = async (req,res)=>{
    try{
        const{mobile,password} = req.body;
        if(!mobile || !password)
        throw new Error({message:"something went wrong"});
        const data = await userModel.findOne({ $or: [{mobile}]});
        if(!data) throw new error({message:"user not found"});
        console.log('data :>> ', data);
        if(data && data.password==password){
            const accessToken = jwt.sign({_id: data._id},process.env.jwt_TOKEN_KEY,{expiresIn:"7d"});
            const userData = {
                id : data._id,
                lastName: data.lastName,
                token : accessToken,
            };
            return res.send({
                success:true,
                message: "login successfully",
                data:userData,
            });
        }
        throw new error({ message: "incorrect password"});
    }catch(error) {
        console.log('error :>> ', error);
       return res.send({ success:false, message:error.message});
     }
};




}
