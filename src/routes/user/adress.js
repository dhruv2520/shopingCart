import { addressController} from '../../controller/user/address.js'
import  {Router}  from 'express';
const router = Router();    


router.post("/addAddress",addressController.addAddress);
router.put("/updateAddress/:id",addressController.updateAddress);

export default router;