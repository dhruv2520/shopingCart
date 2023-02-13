import {userController} from '../../controller/user/login.js'
import  {Router}  from 'express';
import { auth } from '../../middleware/auth.js'
const router = Router();    


router.post("/addUser",userController.addUser);
router.put("/upedateUser",userController.updateUser);
router.post("/loginUser",userController.loginUser);
export default router;