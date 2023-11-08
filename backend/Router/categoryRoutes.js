 const {Router} = require('express');
const { createCategory, updateCategory, deleteCategory, getAllCategories } = require('../Controller/categoryController');


 const categoryRouter = Router();


categoryRouter.post("/createCategory", createCategory);
categoryRouter.post("/updateCategory", updateCategory);
categoryRouter.post("/deleteCategory", deleteCategory);
categoryRouter.post("/getAllCategories", getAllCategories);

module.exports = categoryRouter;
