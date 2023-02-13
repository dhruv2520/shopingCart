import {brandController} from '../../controller/admin/brand.js'
import  {Router}  from 'express';
const router = Router();    


router.post("/addBrand",brandController.addBrand);
router.put("/updateBrand",brandController.updateBrand);
router.delete("/deleteBrand",brandController.deleteBrand);
export default router;