import { userModel } from "../../model/user/login.js";
export class userController {
    static getUser = async (req, res) => {
        const body = req.body
        try {
            const data = await userModel.find()
            if (data) res.status(200).send({ Message: "user Successfully Get", user: data })
            else return res.status(400).send({ Message: "Get user Error In Database" })
        } catch (error) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    }

    static deleteUser = async (req, res) => {
        let id = req.params.id
        try {
            let response = await userModel.deleteOne({ _id: id })
            if (response) {
                return res.status(200).send({ message: "user Successfully Delete" })
            }
            return res.status(404).send({ message: "user With The Specified Id Does Not Exists" })
        } catch (error) {
            console.log('error :>> ', error);
            return res.status(500).send({ message: "Internal Server Error" })
        }
    }
}
