import loginRoutes from "./login.js";
import productRoutes from "./product.js";
import commentRoutes from "./comment.js";
import cartRoutes from "./cart.js";
import addressRouter from "./adress.js";
import brandRouter from "./brand.js";
import categoryRoutes from "./category.js";
import wishlistRouter from "./wislist.js";
import paymentRouter from "./payment.js";

import { Router } from "express";

const router = Router();
router.use("/brand", brandRouter);
router.use("/address", addressRouter);
router.use("/payment", paymentRouter);
router.use("/login", loginRoutes);
router.use("/product", productRoutes);
router.use("/comment", commentRoutes);
router.use("/cart", cartRoutes);
router.use("/category", categoryRoutes);
router.use("/wishlist", wishlistRouter);
export default router;
