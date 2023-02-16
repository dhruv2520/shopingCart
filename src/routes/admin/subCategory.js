import { subCategoryController } from "../../controller/admin/subCategory.js";
import { Router } from "express";
const router = Router();

router.post("/addSubCategory", subCategoryController.addSubCategory);
router.put("/updeteSubCategory/:id", subCategoryController.updateSubCategory);
router.delete(
  "/deleteSubCategory/:id",
  subCategoryController.deleteSubCategory
);

export default router;
