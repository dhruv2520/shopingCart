
import { userModel } from "../../model/user/login.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export class userController {
   static addUser = async (req, res) => {
    const {firstName,lastName,mobile,password}  = req.body
    try {
        const response = await userModel.findOne({mobile:mobile})
        if(response){
            return res.status(409).send({message:"Alredy Register Mobiole Number"})
        }
         const data = await userModel.create({
         firstName:firstName,
         lastName:lastName,
         mobile:mobile,
         password:password
         })
         const salt = await bcryptjs.genSalt(10);
        data.password = await bcryptjs.hash(data.password, salt);
        await data.save();
        if (data) res.status(200).send({message: "user Successfully Added"})
        else return res.status(400).send({message: "Add user Error In Database"})
    } catch (error) {
        console.log('error :>> ', error);
       return res.status(500).send({message: "Internal Server Error"})
    }
}
 static updateUser = async (req, res) => {
    let id = req.params.id
    try {
        const isExist = await usermodel.find()
        if(isExist.length>0){
            const data = await usermodel.findOneAndUpdate({ _id: id},req.body)
            if (data) res.status(200).send({message: "user Successfully Updated"})
        }else return res.status(400).send({message: "user With The Specified Id Does Not Exists"})
    } catch (error) {
       return res.status(500).send({message: error.Message})
    } 
}

// login

static loginUser = async (req,res)=>{
    try{
        const{mobile,password} = req.body;
        if(!mobile || !password)
        throw new Error({message:"something went wrong"});
        const data = await userModel.findOne({ $or: [{mobile}]});
        const isMatch = await bcryptjs.compare(
            String(password),
            data.password
        );
        if(!isMatch){
            return res.send("wrong password");
        }{
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
        return res.send({ message: "incorrect password"});
    }catch(error) {
       return res.send({ success:false, message:error.message});
     }
};

}
