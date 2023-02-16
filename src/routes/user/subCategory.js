import { subCategoryController } from "../../controller/user/subCategory.js";
import { Router } from "express";
const router = Router();

router.get("/getSubCategory", subCategoryController.getSubCategory);

export default router;
