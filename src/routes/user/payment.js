import { paymentController } from "../../controller/user/payment.js";
import { Router } from "express";
const router = Router();


router.post("/addPayment", paymentController.addPayment);

export default router;