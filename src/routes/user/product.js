import { productDataController} from '../../controller/user/product.js'
import  {Router}  from 'express';
const router = Router();    


router.get("/getProduct",productDataController.getproduct);

export default router;