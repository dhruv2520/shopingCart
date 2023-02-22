import { userController } from "../../controller/admin/user.js";
import { Router } from "express";
import { auth } from "../../middleware/auth.js";
const router = Router();

router.get("/getUser", auth, userController.getUser);

export default router;
