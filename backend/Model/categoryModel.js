const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

const categorySchema = new Scheme({
    name : {
        type: String,
        required: true,
        unique:true
    }
}, { timestamps: true } );

mongoose.set("toJSON",{
    virtuals:true,
    transform: (doc,returnValue) => {
        delete returnValue._id;
        delete returnValue._v;
    },
});

categorySchema.statics.createCategory = async function (data) {
    let {name} = data;
    if(!name){
        throw new Error("Name field is Empty")
    }
    const categories = await this.create(data);
    return categories;
};

categorySchema.statics.updateCategory = async function (data) {
    let {id,name} = data;
    if(!id || !name){
        throw new Error("Id or Name Field Is Empty");
    }
    const categories = await this.findByIdAndUpdate(id,{name});
    return categories;
};

categorySchema.statics.deleteCategory = async function (data) {
    const { id } = data;
  
    if (!id) {
      throw new Error("ID is not defined");
    }
  
    const categories = await this.findByIdAndDelete(id);
    return categories;
  };
  
categorySchema.statics.getAllCategories = async function (data) {
    const categories = await this.find({});
    return categories;
  };

  module.exports = mongoose.model("categories",categorySchema);
