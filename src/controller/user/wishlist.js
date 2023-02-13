import {wishlistModel} from "../../model/user/wishlist.js";
export class wishlistController {

    static addWishlist= async (req, res) => {
            try {
            const {userId,productId}  = req.body
                 const data = await wishlistModel.create({
                    userId:userId,
                    productId:productId
                 })
                if (data) res.status(200).send({message: " Successfully Added"})
                else return res.status(400).send({message: "Add product Error In Database"})
            } catch (error) {
                console.log('error :>> ', error);
               return res.status(500).send({message: "Internal Server Error"})
            }
        }
      
        
        
        static getWishlist = async (req, res) => {
            try {
             let userId = req.Headers._id

             console.log('userIds :>> ', userId);
            
             let  data = await wishlistModel.find()
             if (data) {console.log('data :>> ', data);
                 return res.status(200).send({message: "wishlist Successfully get",data})
             }
             return res.status(404).send({message: "comment can not delete"})
         } catch (error) {console.log('error :>> ', error);
             return res.status(500).send({message: "Internal Server Error"})
         }
        }

    }
    // export const getWishlist = async (req, res) => {
    //     try {
    //      let userId = req.params.userId
    //      console.log('userIds :>> ', userId);
        
    //      let  data = await wishlistModel.aggregate([
    //         { $match : { userId :  new ObjectId("63da4c702b27a5414d0287b1") } },
    //     ])
    //      if (data) {console.log('data :>> ', data);
    //          return res.status(200).send({message: "wishlist Successfully get",data})
    //      }
    //      return res.status(404).send({message: "comment can not delete"})
    //  } catch (error) {console.log('error :>> ', error);
    //      return res.status(500).send({message: "Internal Server Error"})
    //  }
    // }