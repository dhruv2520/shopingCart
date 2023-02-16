import {categoryModel } from "../../model/admin/category.js";


export class categoryController { 
    static addCategory = async (req, res) => {
     const {categoryName,subCategoryId}= req.body
     try {
          const data = await categoryModel.create({
            categoryName:categoryName,
            subCategoryId:subCategoryId,
          })
         if (data) res.status(200).send({message: "category Successfully Added"})
         else return res.status(400).send({message: "Add category Error In Database"})
     } catch (error) {
         console.log('error :>> ', error);
        return res.status(500).send({message: "Internal Server Error"})
     }
 }


 static updateCategory = async (req, res) => {
    let id = req.params.id
    try {
        const isExist = await categoryModel.find()
        if(isExist.length>0){
            const data = await categoryModel.findOneAndUpdate({ _id: id},req.body)
            if (data) res.status(200).send({message: "user Successfully Updated"})
        }else return res.status(400).send({message: "user With The Specified Id Does Not Exists"})
    } catch (error) {
       return res.status(500).send({message: error.Message})
    } 
  }

static deleteCategory = async (req, res) => {
  let id = req.params.id
 try {
      let response = await categoryModel.deleteOne({ _id: id})
     if (response) {
         return res.status(200).send({message: "Category Successfully Delete"})
     }
     return res.status(404).send({message: "Category With The Specified Id Does Not Exists"})
 } catch (error) {
  console.log('error :>> ', error);
     return res.status(500).send({message: "Internal Server Error"})
 }
}


}
