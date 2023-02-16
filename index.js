import express, { application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// import bcrypt from "bcrypt";
dotenv.config();
import { Connection } from "./src/config/connection.js";
import router from "./src/routes/index.js";
import filleUplod from "express-fileupload";
// export const password = async (password) =>{
//   const passwordHash = await bcrypt.hash (password,10);
//   console.log(passwordHash)
// }
Connection();
const app = express();

const port = process.env.PORT;
app.use("uploads", express.static("./uploads"));
app.use(filleUplod());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/shoping", router);

app.listen(port, () => {
  console.log(`server running on port : ${port}`);
});
