import fs from "fs";
import aws from "aws-sdk";

//import { config } from "dotenv";

export const uploadFile = (productId, file) => {
    const path = `./uploads/${productId}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    const imagePath = `/uploads/${productId}/${file.name}`;
    file.mv(`./uploads/${productId}/${file.name}`, (err) => {
      if (err) {
        return err;
      }
    })
return  imagePath;  

    imageData.push({
        path: `/uploads/${productId}/${image.name}`,
        productId: productId,
      });
};

