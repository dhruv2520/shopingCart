import { paymentController } from "../../controller/user/payment.js";
import { Router } from "express";
const router = Router();

router.post("/addPayment", paymentController.addPayment);
router.post("/adddata", paymentController.adddata);

export default router;
