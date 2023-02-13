import { paymentController } from "../../controller/admin/payment.js";
import { Router } from "express";
const router = Router();

router.get("/getPayment", paymentController.getPayment);
export default router;
