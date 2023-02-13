import { productController} from '../../controller/admin/product.js'
import  {Router}  from 'express';
const router = Router();    


router.post("/addProduct",productController.addProduct);
router.delete("/deleteProduct/:id",productController.deleteProduct);
router.put("/updeteProduct/:id",productController.updateProduct);

export default router;

