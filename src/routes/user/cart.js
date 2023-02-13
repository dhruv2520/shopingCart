import { cartController} from '../../controller/user/cart.js'
import  {Router}  from 'express';
const router = Router();    

router.post("/addToCart",cartController.addToCart);
router.get("/getToCart",cartController.getToCart);
router.delete("/deleteCart/:id",cartController.deleteCart);


export default router;