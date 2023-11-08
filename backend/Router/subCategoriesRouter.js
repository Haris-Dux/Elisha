

const { Router } = require("express");
const { createSubCategory, updateSubCategory, deleteSubCategory, getAllSubCategories } = require("../Controller/subCategoriesController");

const subCategoryRouter = Router();

subCategoryRouter.post("/createSubCategory", createSubCategory);
subCategoryRouter.post("/updateSubCategory", updateSubCategory);
subCategoryRouter.post("/deleteSubCategory", deleteSubCategory);
subCategoryRouter.post("/getAllSubCategories", getAllSubCategories);


module.exports = subCategoryRouter;
