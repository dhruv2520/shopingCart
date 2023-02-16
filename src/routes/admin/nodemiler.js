import { nodemailerController } from "../../controller/admin/nodemiler.js";
import { Router } from "express";
const router = Router();

router.post("/nodemailer", nodemailerController.nodemailer);

export default router;
