const mongoose = require('mongoose');
const { uploadImageToCloudinary, deleteImageToCloudinary } = require('../assets/cloudinary');

const Schema = mongoose.Schema;

const categoryTypeSchema = new Schema({
  category: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  image: {
    public_id: { type: String },
    secure_url: { type: String },
  },
  name: {
    type: String,
    required: true
  },
}, { timestamps: true });

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, returnValue) => {
    delete returnValue._id;
    delete returnValue.__v;
  },
});


categoryTypeSchema.statics.createCategoryType = async function (data) {
  const { category, image, name } = data;
  let categoryTypeQuery = { name, category };
  if (!category) {
    throw new Error("Category Not provided")
  }

  if (!name) {
    throw new Error("Image Not provided")
  }
  if (image) {
    const result = await uploadImageToCloudinary(image, "/Category Types");
    let imageData = {
      secure_url: result.secure_url,
      public_id: result.public_id
    };
    categoryTypeQuery = { ...categoryTypeQuery, image: imageData }
  }
  const categoryType = await this.create(categoryTypeQuery);
  return categoryType;
};

categoryTypeSchema.statics.updateCategoryType = async function (data) {
  const { id, category, image, name } = data;
  let categoryTypeQuery = { category, name };
  if (!category) {
    throw new Error('Category Not Provided')
  }
  if (!name) {
    throw new Error('Category Not Provided')
  }
  if (!id) {
    throw new Error('ID Not Provided')
  }
  if (image) {
    const result = await uploadImageToCloudinary(image, "/Category Types");
    let imageData = {
      secure_url: result.secure_url,
      public_id: result.public_id
    };
    const categoryTypeData = await this.findById(id);
    if (categoryTypeData.image.public_id) {
      await deleteImageToCloudinary(categoryTypeData.image.public_id)
    }
    categoryTypeQuery = { ...categoryTypeQuery, image: imageData }
  }
  const updatedCategoryType = await this.findByIdAndUpdate({ _id: id }, categoryTypeQuery);
  return updatedCategoryType;
};

categoryTypeSchema.statics.deleteCategoryType = async function (data) {
  const { id } = data;

  if (!id) {
    throw new Error("ID is not defined");
  }

  const categoryTypeData = await this.findById(id);

  deleteImageToCloudinary(categoryTypeData.image.public_id);

  const categoriesType = await this.findByIdAndDelete(id);
  return categoriesType;
};

categoryTypeSchema.statics.getAllCategoryTypes = async function (data) {
  const { category } = data;

  if (!category) {
    throw new Error("Category not selected");
  }

  const categoriesTypes = await this.find({ category });
  return categoriesTypes;
};

module.exports = mongoose.model("categoryTypes", categoryTypeSchema);