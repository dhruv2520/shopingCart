import {commentModel} from "../../model/admin/comment.js";
export class commentController {

    static addComment= async (req, res) => {
            try {
            const {comment}  = req.body
                 const data = await commentModel.create({
                    comment:comment
                    
                 })
                if (data) res.status(200).send({message: " Successfully Added"})
                else return res.status(400).send({message: "Add product Error In Database"})
            } catch (error) {
                console.log('error :>> ', error);
               return res.status(500).send({message: "Internal Server Error"})
            }
        }

        static updateComment= async (req, res) => {
            try {
            const {comment}  = req.body
                 const data = await commentModel.find({
                    comment:comment
                    
                 })
                if (data) res.status(200).send({message: " Successfully updateComment"})
                else return res.status(400).send({message: "updateComment Error In Database"})
            } catch (error) {
                console.log('error :>> ', error);
               return res.status(500).send({message: "Internal Server Error"})
            }
        }

    }