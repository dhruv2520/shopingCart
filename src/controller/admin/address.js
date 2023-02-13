import {addressModel} from "../../model/user/address.js";


export class  addressController {
    static getAddress = async (req, res, next) => {
        try {
            const data = await addressModel.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "address"
                    }
                },
            ]);
            console.log("data", data);
            if (data) {
                return res.status(200).send({ message: "successfully get address", data: data })
            }
    
            return res.status(400).send({ message: "get address Error In Database" })
        } catch (error) {
            return res.status(500).send({ message: error.Message })
    
        }
    }

    static deleteAddress = async (req, res) => {
        let id = req.params.id
        try {
            let response = await addressModel.deleteOne({ _id: id })
            if (response) {
                return res.status(200).send({ message: "address Successfully Delete" })
            }
            return res.status(404).send({ message: "address With The Specified Id Does Not Exists" })
        } catch (error) {
            console.log('error :>> ', error);
            return res.status(500).send({ message: "Internal Server Error" })
        }
    }
}    