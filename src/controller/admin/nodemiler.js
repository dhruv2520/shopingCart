import express from "express";
const app = express();
import nodemailer from "nodemailer";
export class nodemailerController {
  static nodemailer = async (req, res) => {
    try {
      const body = req.body;
      const transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "pinal.igenerate@gmail.com",
          pass: "rdhtlnrhhanlydce",
        },
      });
      const mailOptions = {
        from: "pinal.igenerate@gmail.com",
        to: body.to,
        subject: body.subject,
        text: body.text,
        cc: body.cc,
      };
      transporter.sendMail(mailOptions, function (err, success) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send({ message: " email successfuly" });
        }
      });
    } catch (error) {
      console.log("error:>>>", error);
      returnres.status(500).send({ message: "internal server Error" });
    }
  };
}
