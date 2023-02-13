import {commentModel } from "../../model/admin/comment.js";
export class commentController { 
    static getComment = async (req, res) => {
    const body = req.body
    try {
         const data = await commentModel.find()
        if (data) res.status(200).send({message: "comment Successfully get",data})
        else return res.status(400).send({message: "get comment Error In Database"})
    } catch (error) {
       return res.status(500).send({message: "Internal Server Error"})
    }
}



static deleteComment = async (req, res) => {
  let id = req.params.id
 try {
      let response = await commentModel.deleteOne({ _id: id})
     if (response) {
         return res.status(200).send({message: "comment Successfully Delete"})
     }
     return res.status(404).send({message: "comment can not delete"})
 } catch (error) {
     return res.status(500).send({message: "Internal Server Error"})
 }
}


}