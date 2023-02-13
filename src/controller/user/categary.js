import {categoryModel } from "../../model/admin/category.js";


export class categoryController { 
  
 static getCategory = async (req, res) => {
    const body = req.body
    try {
      const data = await categoryModel.aggregate([
         {
             $lookup: {
                 from: "brands",
                 localField: "brandId",
                 foreignField: "_id",
                 as: "brand"
             },
          
         },
         {
             $lookup: {
                 from: "products",
                 localField: "productId",
                 foreignField: "_id",
                 as: "products"
             }
         }
     ]);
        if (data) res.status(200).send({message: "category Successfully Added",data})
        else return res.status(400).send({message: "Add category Error In Database"})
    } catch (error) {
       return res.status(500).send({message: "Internal Server Error"})
    }
}
 }


