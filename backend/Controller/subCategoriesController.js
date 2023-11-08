
const subCategoryModel = require("../Model/subCategoriesModel");

async function createSubCategory(req, res) {
  try {
    const subCategoryData = await subCategoryModel.createSubCategory(req.body);
    res.status(200).json({ subCategoryData, msg: "Created Sub Category" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

async function updateSubCategory(req, res) {
  try {
    const subCategoryData = await subCategoryModel.updateSubCategory(req.body);
    res.status(200).json({ subCategoryData, msg: "Update Sub Category" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

async function deleteSubCategory(req, res) {
  try {
    const subCategoryData = await subCategoryModel.deleteSubCategory(req.body);
    res.status(200).json({ subCategoryData, msg: "Delete Sub Category" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

async function getAllSubCategories(req, res) {
  try {
    const subCategoryData = await subCategoryModel.getAllSubCategories(
      req.body
    );
    res.status(200).json({ subCategoryData, msg: "Got All Sub Categories" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


module.exports = {
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategories,
};
