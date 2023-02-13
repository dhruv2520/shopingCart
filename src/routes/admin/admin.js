import {adminController} from '../../controller/admin/admin.js'
import  {Router}  from 'express';
import { auth } from '../../middleware/auth.js'
const router = Router();    


router.get("/getAdmin",auth,adminController.getAdmin);;
router.post("/loginAdmin",adminController.loginAdmin)
export default router;