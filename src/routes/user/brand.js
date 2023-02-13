import { brandController} from '../../controller/user/brand.js'
import  {Router}  from 'express';
const router = Router();    


router.get("/getBrand",brandController.getBrand);
export default router;