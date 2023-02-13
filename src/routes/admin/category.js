import { categoryController} from '../../controller/admin/category.js'
import  {Router}  from 'express';
const router = Router();    


router.post("/addCategory",categoryController.addCategory);

router.delete("/deleteCategory/:id",categoryController.deleteCategory);
router.put("/updetCategory/:id",categoryController.updateCategory);





export default router;