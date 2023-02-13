import { categoryController} from '../../controller/user/categary.js'
import  {Router}  from 'express';
const router = Router();    


router.get("/getCategory",categoryController.getCategory);
export default router;