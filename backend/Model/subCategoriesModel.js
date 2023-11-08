
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categoriesSchema = new Schema(
  {
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    categoryType: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, returnValue) => {
    delete returnValue._id;
    delete returnValue.__v;
  },
});

categoriesSchema.statics.createSubCategory = async function (data) {
  const { category, categoryType, name } = data;

  if (!category) {
    throw new Error("Category is not selected");
  }

  if (!categoryType) {
    throw new Error("Category Type is not selected");
  }

  if (!name) {
    throw new Error("Name is Empty");
  }

  const subCategories = await this.create(data);
  return subCategories;
};

categoriesSchema.statics.updateSubCategory = async function (data) {
  const { id, name, category, categoryType } = data;

  if (!id) {
    throw new Error("ID is Empty");
  }

  if (!name) {
    throw new Error("Name is Empty");
  }

  if (!category) {
    throw new Error("Category is not selected");
  }

  if (!categoryType) {
    throw new Error("Category Type is not selected");
  }

  const subCategories = await this.findByIdAndUpdate(id, {
    name,
    category,
    categoryType,
  });
  return subCategories;
};

categoriesSchema.statics.deleteSubCategory = async function (data) {
  const { id } = data;
  const subCategories = await this.findByIdAndDelete(id);
  return subCategories;
};

categoriesSchema.statics.getAllSubCategories = async function (data) {
  const { category, categoryType } = data;
  let subCategoriesQuery = {};

  if (category) {
    subCategoriesQuery = { ...subCategoriesQuery, category };
  }

  if (categoryType) {
    subCategoriesQuery = { ...subCategoriesQuery, categoryType };
  }

  const subCategories = await this.find(subCategoriesQuery);
  return subCategories;
};


module.exports = mongoose.model("subCategories", categoriesSchema);
