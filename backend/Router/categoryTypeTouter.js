

const { Router } = require("express");
const { createCategoryType, updateCategoryType, deleteCategoryType, getAllCategoryTypes } = require("../Controller/categoryTypeController");

const categoryTypeRouter = Router();

categoryTypeRouter.post("/createCategoryType", createCategoryType);
categoryTypeRouter.post("/updateCategoryType", updateCategoryType);
categoryTypeRouter.post("/deleteCategoryType", deleteCategoryType);
categoryTypeRouter.post("/getAllCategoryTypes", getAllCategoryTypes);


module.exports = categoryTypeRouter;
