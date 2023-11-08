
const categoryModel = require('../Model/categoryModel');

async function createCategory(req, res) {
    try {
      const categoryData = await categoryModel.createCategory(req.body);
      res.status(200).json({ categoryData, msg: "Created Category" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  
  async function updateCategory(req, res) {
    try {
      const categoryData = await categoryModel.updateCategory(req.body);
      res.status(200).json({ categoryData, msg: "Updated Category" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  
  async function deleteCategory(req, res) {
    try {
      const categoryData = await categoryModel.deleteCategory(req.body);
      res.status(200).json({ categoryData, msg: "Category Deleted" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  
  async function getAllCategories(req, res) {
    try {
      const categoryData = await categoryModel.getAllCategories(req.body);
      res.status(200).json({ categoryData, msg: "Got All Categories" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };

  module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories
  }