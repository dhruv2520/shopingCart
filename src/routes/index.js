import userRoutes from "./user/index.js";
import adminRoutes from "./admin/index.js";
import { Router } from "express";
const router = Router();

router.use("/admin", adminRoutes)
router.use("/user", userRoutes)

export default router;
