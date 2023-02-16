import categoryRoutes from "./category.js";
import productRoutes from "./product.js";
import commentRoutes from "./comment.js";
import adminRoutes from "./admin.js";
import addressRoutes from "./address.js";
import brandRoutes from "./brand.js";
import paymentRoutes from "./payment.js";
import subCategoryRoutes from "./subCategory.js";
import nodemailerRoutes from "./nodemiler.js";

import { Router } from "express";
const router = Router();
router.use("/subCategory", subCategoryRoutes);
router.use("/payment", paymentRoutes);
router.use("/brand", brandRoutes);
router.use("/address", addressRoutes);
router.use("/login", adminRoutes);
router.use("/category", categoryRoutes);
router.use("/product", productRoutes);
router.use("/comment", commentRoutes);
router.use("/nodemailer", nodemailerRoutes);

export default router;
