import { addressController} from '../../controller/admin/address.js'
import  {Router}  from 'express';
const router = Router();    



router.get("/getAddress",addressController.getAddress);
router.delete("/deleteAddress/:id",addressController.deleteAddress);






export default router;
