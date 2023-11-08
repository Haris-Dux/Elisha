
const categoryTypeModel = require('../Model/categoryTypeModel')

async function createCategoryType(req, res) {
    try {
      const categoryTypeData = await categoryTypeModel.createCategoryType(
        req.body
      );
      res.status(200).json({ categoryTypeData, msg: "Created Category Type" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  
  async function updateCategoryType(req, res) {
    try {
      const categoryTypeData = await categoryTypeModel.updateCategoryType(
        req.body
      );
      res.status(200).json({ categoryTypeData, msg: "Updated Category Type" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  
  async function deleteCategoryType(req, res) {
    try {
      const categoryTypeData = await categoryTypeModel.deleteCategoryType(
        req.body
      );
      res.status(200).json({ categoryTypeData, msg: "Category Type Deleted" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  
  async function getAllCategoryTypes(req, res) {
    try {
      const categoryTypesData = await categoryTypeModel.getAllCategoryTypes(
        req.body
      );
      res.status(200).json({ categoryTypesData, msg: "Got All Category Types" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };

  module.exports = {
    createCategoryType,
    updateCategoryType,
    deleteCategoryType,
    getAllCategoryTypes
  }